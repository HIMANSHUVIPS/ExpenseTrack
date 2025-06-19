import React from 'react';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back</h2>

        
        <form className={styles.form}>
          <input type="email" placeholder="Email Address" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <button type="submit" className={styles.button}>Login</button>
        </form>

        <div className={styles.divider}><span>or</span></div>

        <button className={styles.googleBtn}>
          <img src="/google.png" alt="Google" />
          Continue with Google
        </button>

        <p className={styles.signupText}>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
