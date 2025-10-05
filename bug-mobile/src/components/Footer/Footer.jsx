import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../../assets/images/logo sem efeito.png';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <img src={logo} alt="Logo Cyber Squad" />
          <div className={styles.footerLogoText}>
            <h3>CYBER SQUAD</h3>
            <p className={styles.footerDescricao}>Transformando desafios em solução</p>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <h4>LINKS</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="/#sobreNos">Sobre Nós</a></li>
            <li><Link to="/projeto">Projeto</Link></li>
          </ul>
        </div>
        {/* ... Restante do conteúdo do footer ... */}
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 Cyber Squad - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;