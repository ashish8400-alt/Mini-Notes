const User = require("../models/User");
const bcrypt = require("bcryptjs");



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
    const existingUser = await User.findOne({email: req.body.email});

    if(!existingUser){
      res.status(400).json({message: "User does not exist"});
    }
     

    

    
  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({message: "Server Error"});
    
  }
}

module.exports = {
  registerUser, loginUser
}