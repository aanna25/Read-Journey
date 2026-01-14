import { Link } from "react-router-dom";
import styles from "./UserNav.module.css";

const UserNav = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Start your workout</h3>
      
      <ul className={styles.list}>
        <li className={styles.item}>
          <span className={styles.number}>1</span>
          <p className={styles.text}>
            <span className={styles.accent}>Create a personal library:</span> add the books you intend to read to it.
          </p>
        </li>
        
        <li className={styles.item}>
          <span className={styles.number}>2</span>
          <p className={styles.text}>
            <span className={styles.accent}>Create your first workout:</span> define a goal, choose a period, start training.
          </p>
        </li>
      </ul>

      <div className={styles.linkWrapper}>
        <Link to="/library" className={styles.link}>
          My library
        </Link>
        <svg className={styles.icon} width="24" height="24">
          <use href="/src/assets/icons.svg#icon-arrow-right"></use>
        </svg>
      </div>
    </div>
  );
};

export default UserNav;