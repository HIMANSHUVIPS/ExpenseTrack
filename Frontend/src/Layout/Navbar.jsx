import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserStore } from "../Store/Store";

const Navbar = () => {
  const { userData } = useContext(UserStore);
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      {/* <img className="logo_img" src="/rupee.png"/> */}
      <div className={styles.logo}>
        <span className={styles.logoPrimary}>Ex</span>
        <span className={styles.logoAccent}>pen</span>
        <span className={styles.logoHighlight}>zo</span>
      </div>

      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <NavLink to="/layout/home">DashBoard</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/layout/add-expense">Add Expense</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/layout/add-income">Add Income </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/layout/report">Report</NavLink>
        </li>
      </ul>

      <div className={styles.userSection}>
        {userData.name?(
          <>
          <span className={styles.username}>Hi, {userData.name}</span>
        <img
          className={styles.avatar}
          src="/office-man.png"
          alt="User Avatar"
        />
          </>
        ):<span className={`${styles.username} ${styles.loguser}`} onClick={()=>{
          navigate('/');
        }}>Login</span>}
        
      </div>
    </nav>
  );
};

export default Navbar;
