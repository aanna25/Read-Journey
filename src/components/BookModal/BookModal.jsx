import { useEffect } from "react";
import { LuX } from "react-icons/lu";
import styles from "./BookModal.module.css";

const BookModal = ({ book, onClose, onAdd }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!book) return null;

  return (
    <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <LuX size={24} color="#F9F9F9" />
        </button>

        <img src={book.imageUrl} alt={book.title} className={styles.modalImg} />
        
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.pages}>{book.totalPages} pages</p>

        <button className={styles.addBtn} onClick={() => onAdd(book._id)}>
          Add to library
        </button>
      </div>
    </div>
  );
};

export default BookModal;