import { LuTrash2 } from "react-icons/lu";
import defaultBookImg from "../../assets/default-book.png";
import styles from "./BookCard.module.css";

const BookCard = ({ book, onDelete, onClick }) => {
  const { title, author, imageUrl } = book;

  return (
<li className={styles.card}>
      <div className={styles.imageWrapper} onClick={() => onClick(book)}>
        <img
          src={imageUrl || defaultBookImg}
          alt={title}
          className={styles.image}
          onError={(e) => {
            e.target.src = defaultBookImg;
          }}
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.textBlock}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.author}>{author}</p>
        </div>
        <button 
          type="button" 
          className={styles.deleteBtn} 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default BookCard;