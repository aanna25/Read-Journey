import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/auth/operations";
import Logo from "../Logo/Logo.jsx";
import UserBar from "../UserBar/UserBar.jsx";
import { LuX } from "react-icons/lu";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        <nav className={styles.desktopNav}>
          <NavLink
            to="/recommended"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            My library
          </NavLink>
        </nav>

        <div className={styles.userSection}>
          <UserBar />

          <button
            type="button"
            className={styles.logoutBtn}
            onClick={handleLogout}
          >
            Log out
          </button>

          <button
            type="button"
            className={styles.burgerBtn}
            onClick={toggleMenu}
          >
            <HiOutlineMenuAlt3 size={28} color="#F9F9F9" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <button className={styles.closeBtn} onClick={toggleMenu}>
            <LuX size={28} color="#F9F9F9" />
          </button>

          <nav className={styles.mobileNav}>
            <NavLink
              to="/recommended"
              onClick={toggleMenu}
              className={styles.mobileLink}
            >
              Home
            </NavLink>
            <NavLink
              to="/library"
              onClick={toggleMenu}
              className={styles.mobileLink}
            >
              My library
            </NavLink>
          </nav>

          <button className={styles.mobileLogoutBtn} onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
