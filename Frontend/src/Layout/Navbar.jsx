import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { UserStore } from "../Store/Store";

const Navbar = () => {
  const { userData } = useContext(UserStore);
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
        <span className={styles.username}>Hi, {userData.name}</span>
        <img
          className={styles.avatar}
          src="/office-man.png"
          alt="User Avatar"
        />
      </div>
    </nav>
  );
};

export default Navbar;
