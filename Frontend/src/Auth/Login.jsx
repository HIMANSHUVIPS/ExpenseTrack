import React, { useState } from "react";
import styles from "./Login.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendURL}/auth/expense/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/layout/home");
      }, 1000);
      setEmail(" ");
      setPassword(" ");
    } catch (error) {
      toast.error("Login error:", error.response?.data || error.message);
    }
  };
  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <button
          className={styles.googleBtn}
          onClick={() => {
            window.location.href = `${backendURL}/auth/smarteats/google`;
          }}
        >
          <img src="/google.png" alt="Google" />
          Continue with Google
        </button>

        <p className={styles.signupText}>
          Don't have an account? <NavLink to="/register">Register here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
