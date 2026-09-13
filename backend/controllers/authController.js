const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//Register User 
const registerUser = async (req, res)=>{
    
try{

  const {name, email, password} = req.body;


  // Check user already exists
  const existingUser = await User.findOne({email});

  if(existingUser){
    return res.status(400).json({message: "User already exists"});  
}



// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Create new User 

const user = await User.create({
  name, 
  email,
  password: hashedPassword
});

console.log("User registered successfully:", user.email)

res.status(201).json({
  message: "User registered successfully",
  user:{
    id: user._id,
    name: user.name,
    email: user.email
  }
});
} 
catch(error){
  console.error("Register Error:", error);

  res.status(500).json({message: "Server Error"});
}
};



// Login User
const loginUser = async (req, res)=>{

  console.log("Login this page");
  try {

const {email, password} = req.body;


  // 1. User ko email se find karo
    const user  = await User.findOne({email});

    if(!user){
      res.status(400).json({message: "User does not exist"});
    }


     // Password check
     const isPasswordCorrect = await bcrypt.compare(password, user.password);

     if(!isPasswordCorrect){
    return res.status(400).json({message: "Invalid email or password"});
     }
      
// JWT token create
const token = jwt.sign({
  userId: user._id
},
process.env.JWT_SECRET, {
  expiresIn: "7d"
}
);
    
// Response 
res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
})
    
  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({message: "Server Error"});
    
  }
}


module.exports = {
  registerUser, loginUser
}