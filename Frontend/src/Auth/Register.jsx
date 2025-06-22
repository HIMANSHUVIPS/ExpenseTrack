import React, { useState } from "react";
import styles from "./Register.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${backendURL}/auth/expense/signup`,
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );
    setTimeout(() => {
      navigate("/layout/home");
    }, 1000);
    setName("");
    setEmail("");
    setPassword("");
    toast.success(response.data.message || "Signup successful!");
  };
  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.card}>
        <h2 className={styles.title}>Create Account</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className={styles.input}
            onChange={handleNameChange}
            value={name}
          />
          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
            onChange={handleEmailChange}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            onChange={handlePasswordChange}
            value={password}
          />
          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <button className={styles.googleBtn} onClick={()=>{
          window.location.href=`${backendURL}/auth/smarteats/google`;
        }}>
          <img src="/google.png" alt="Google" />
          Sign up with Google
        </button>

        <p className={styles.loginText}>
          Already have an account? <NavLink to="/login">Login here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
