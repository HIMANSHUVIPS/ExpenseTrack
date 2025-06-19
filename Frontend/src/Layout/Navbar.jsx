import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* <img className="logo_img" src="/rupee.png"/> */}
      <div className={styles.logo}> Expense Tracker</div>

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
        <span className={styles.username}>Hi, User</span>
        <img
          className={styles.avatar}
          src="https://i.pravatar.cc/300?img=3"
          alt="User Avatar"
        />
      </div>
    </nav>
  );
};

export default Navbar;
