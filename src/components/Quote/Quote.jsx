import styles from './Quote.module.css';
import quoteIcon from '../../assets/books.png'; 

const Quote = () => {
  return (
    <div className={styles.quoteContainer}>
      <div className={styles.iconWrapper}>
        <img src={quoteIcon} alt="Books" width="40" height="40" />
      </div>
      <p className={styles.text}>
        "Books are <span className={styles.whiteText}>windows</span> to the world, and reading is a journey into the unknown."
      </p>
    </div>
  );
};

export default Quote;