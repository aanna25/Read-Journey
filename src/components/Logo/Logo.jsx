import { Link } from 'react-router-dom';
import logoPath from '../../assets/icon.svg'; 
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img src={logoPath} alt="Read Journey Logo" className={styles.icon} />
      <span className={styles.logoText}>READ JOURNEY</span>
    </Link>
  );
};

export default Logo;