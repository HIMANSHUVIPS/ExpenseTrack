import React from 'react';
import styles from './Register.module.css';

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Account</h2>
        
        <form className={styles.form}>
          <input type="text" placeholder="Full Name" className={styles.input} />
          <input type="email" placeholder="Email Address" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <button type="submit" className={styles.button}>Register</button>
        </form>

        <div className={styles.divider}><span>or</span></div>

        <button className={styles.googleBtn}>
          <img src="/google.png" alt="Google" />
          Sign up with Google
        </button>

        <p className={styles.loginText}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
