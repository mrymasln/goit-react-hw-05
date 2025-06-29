import React from "react";
import styles from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={styles.navContainer}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        HOME
      </NavLink>

      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        MOVIES
      </NavLink>
    </nav>
  );
};

export default Navigation;
