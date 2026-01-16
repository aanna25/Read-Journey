import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectRecommendedBooks } from "../../redux/books/selectors";
import { LuMoveRight } from "react-icons/lu";
import styles from "./RecommendedWidget.module.css";

const RecommendedWidget = () => {
  const allRecommended = useSelector(selectRecommendedBooks);

  const previewBooks = allRecommended.slice(0, 3);

  return (
    <div className={styles.widget}>
      <h3 className={styles.title}>Recommended books</h3>

      <ul className={styles.list}>
        {previewBooks.map((book) => (
          <li key={book._id} className={styles.item}>
            <img
              src={book.imageUrl}
              alt={book.title}
              className={styles.bookImg}
            />
          </li>
        ))}
      </ul>
      <Link to="/recommended" className={styles.link}>
        Home
        <LuMoveRight size={20} className={styles.icon} />
      </Link>
    </div>
  );
};

export default RecommendedWidget;
