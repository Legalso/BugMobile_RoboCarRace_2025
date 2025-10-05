import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo sem efeito.png';
import { navLinks } from '../../data/navLinks';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setVisible(false);
      } else { // if scroll up show the navbar
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  }

  return (
    <nav className={`${styles.menuNav} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.imgAcima}>
        <div className={styles.cabecalhoLogo}>
          <Link to="/">
            <img src={logo} alt="Logo" id={styles.cabecalhoLogo} />
          </Link>
        </div>
        <button id={styles.menuToggle} className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </button>
        <ul className={`${styles.menuItens} ${menuOpen ? styles.active : ''}`}>
          {navLinks.map((link) => (
            <li key={link.text}>
              {link.isExternal ? (
                <a className={styles.links} href={link.href} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                  {link.text}
                </a>
              ) : (
                <NavLink 
                  className={({ isActive }) => `${styles.links} ${isActive && link.href === '/' ? styles.negrito : ''}`} 
                  to={link.href}
                  onClick={handleLinkClick}
                >
                  {link.text}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;