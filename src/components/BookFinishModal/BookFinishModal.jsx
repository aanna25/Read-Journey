import styles from "./BookFinishModal.module.css";
import booksIcon from "../../assets/books.png";
import { LuX } from "react-icons/lu";

const BookFinishModal = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                  <LuX size={24} color="#F9F9F9" />
                </button>
        
        <img src={booksIcon} alt="Books" className={styles.icon} />
        
        <h2 className={styles.title}>The book is read</h2>
        
        <p className={styles.text}>
          It was an <span className={styles.highlight}>exciting journey</span>,
          where each page revealed new horizons, and the characters became
          inseparable friends.
        </p>
      </div>
    </div>
  );
};

export default BookFinishModal;