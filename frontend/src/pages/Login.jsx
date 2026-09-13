import { useState } from "react";
import api from "../api/axios";
import "./Login.css";
import { Link , useNavigate } from "react-router-dom";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(response.data);

      setMessage(response.data.message);
      setMessageType("success");

      // JWT token save karna
      localStorage.setItem("token", response.data.token);

      navigate("/notes");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );

      setMessageType("error");
    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Mini Notes</h1>
        <p>Login to your account</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="register-text">
  Don't have an account?{" "}
  <Link to="/register">Register</Link>
</p>

      </div>

      {message && (
        <div className={`toast ${messageType}`}>
          {message}
        </div>
      )}

    </div>
  );
}

export default Login;