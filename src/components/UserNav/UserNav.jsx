import { Link } from "react-router-dom";
import { LuMoveRight } from "react-icons/lu";
import styles from "./UserNav.module.css";

const UserNav = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Start your workout</h3>

      <ul className={styles.list}>
        <li className={styles.item}>
          <span className={styles.number}>1</span>
          <p className={styles.text}>
            <span className={styles.accent}>Create a personal library:</span>{" "}
            add the books you intend to read to it.
          </p>
        </li>

        <li className={styles.item}>
          <span className={styles.number}>2</span>
          <p className={styles.text}>
            <span className={styles.accent}>Create your first workout:</span>{" "}
            define a goal, choose a period, start training.
          </p>
        </li>
      </ul>

      <div className={styles.linkWrapper}>
        <Link to="/library" className={styles.link}>
          My library
        </Link>
        <LuMoveRight className={styles.icon} size={24} />
      </div>
    </div>
  );
};

export default UserNav;
