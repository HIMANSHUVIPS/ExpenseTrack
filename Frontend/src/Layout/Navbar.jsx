import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>💰 Expense Tracker</div>

      <ul className={styles.navItems}>
        <li className={styles.navItem}><a href="#">Dashboard</a></li>
        <li className={styles.navItem}><a href="#">Add Expense</a></li>
        <li className={styles.navItem}><a href="#">Reports</a></li>
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
