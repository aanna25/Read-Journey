import defaultBookImg from "../../assets/default-book.png";
import { IoClose } from "react-icons/io5";
import styles from "./BookDetailsModal.module.css";

const BookDetailsModal = ({ book, onClose, onStart }) => {
  const { title, author, totalPages, imageUrl } = book;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <IoClose size={24} />
        </button>
        <div className={styles.content}>
          <img
            src={imageUrl || defaultBookImg}
            alt={title}
            className={styles.image}
            onError={(e) => (e.target.src = defaultBookImg)}
          />          
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.author}>{author}</p>
          <p className={styles.pages}>{totalPages} pages</p>
          <button className={styles.startBtn} onClick={() => onStart(book._id)}>
            Start reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;