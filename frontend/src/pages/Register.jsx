import { useState } from "react";
import api from "../api/axios";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      setMessage(response.data.message);
      setMessageType("success");

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );

      setMessageType("error");
    }
  };

  return (
    <div className="register-page">

      <div className="register-box">

        <h1>Mini Notes</h1>
        <p>Create your account</p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Register
          </button>

        </form>

       <p className="login-text">
  Already have an account?{" "}
  <Link to="/login">Login</Link>
</p>

      </div>

      {/* MESSAGE */}
      {message && (
        <div className={`toast ${messageType}`}>
          {message}
        </div>
      )}

    </div>
  );
}

export default Register;