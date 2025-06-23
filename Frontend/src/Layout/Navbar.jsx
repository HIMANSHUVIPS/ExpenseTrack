import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserStore } from "../Store/Store";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const { userData } = useContext(UserStore);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0; path=/;";
    navigate("/login");
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoPrimary}>Ex</span>
        <span className={styles.logoAccent}>pen</span>
        <span className={styles.logoHighlight}>zo</span>
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      <ul className={`${styles.navItems} ${mobileMenuOpen ? styles.showMenu : ""}`}>
        <li className={styles.navItem}>
          <NavLink to="/layout/home" onClick={() => setMobileMenuOpen(false)}>DashBoard</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/layout/add-expense" onClick={() => setMobileMenuOpen(false)}>Add Expense</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/layout/add-income" onClick={() => setMobileMenuOpen(false)}>Add Income</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/layout/report" onClick={() => setMobileMenuOpen(false)}>Report</NavLink>
        </li>
        <li className={styles.navItem}>
          <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </li>
      </ul>

      <div className={styles.userSection}>
        {userData.name ? (
          <>
            <span className={styles.username}>Hi, {userData.name}</span>
            <img className={styles.avatar} src="/office-man.png" alt="User Avatar" />
            {/* <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button> */}
          </>
        ) : (
          <span className={`${styles.username} ${styles.loguser}`} onClick={() => navigate("/")}>Login</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
