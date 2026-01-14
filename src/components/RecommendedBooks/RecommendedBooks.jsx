import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedBooks } from "../../redux/books/operations";
import {
  selectRecommendedBooks,
  selectTotalPages,
  selectFilter,
} from "../../redux/books/selectors";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import styles from "./RecommendedBooks.module.css";


const getLimit = () => {
  if (typeof window === "undefined") return 2;
  const width = window.innerWidth;
  if (width >= 1440) return 10;
  if (width >= 768) return 8;
  return 2;
};

const RecommendedBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectRecommendedBooks);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectFilter);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(getLimit());
  

  const [prevFilters, setPrevFilters] = useState(filters);
  if (filters !== prevFilters) {
    setPrevFilters(filters);
    setPage(1);
  }

 
  useEffect(() => {
    const handleResize = () => {
      const newLimit = getLimit();
      setLimit(newLimit);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 
  useEffect(() => {
    dispatch(
      fetchRecommendedBooks({
        page,
        limit,
        title: filters.title,
        author: filters.author,
      })
    );
  }, [dispatch, page, limit, filters.title, filters.author]);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <section className={styles.section}>
      <div className={styles.containerHeader}>
        <h2 className={styles.title}>Recommended</h2>
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={handlePrev}
            disabled={page === 1}
          >
            <LuChevronLeft size={20} />
          </button>

          <button
            type="button"
            className={styles.pageBtn}
            onClick={handleNext}
            disabled={page >= totalPages || totalPages === 0}
          >
            <LuChevronRight size={20} />
          </button>
        </div>
      </div>

      <ul className={styles.list}>
        {books.length > 0 ? (
          books.map(({ _id, title, author, imageUrl }) => (
            <li key={_id} className={styles.item}>
              <img
                src={imageUrl || "https://via.placeholder.com/137x208"}
                alt={title}
                className={styles.img}
              />
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{title}</h3>
                <p className={styles.bookAuthor}>{author}</p>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.noBooks}>No books found for your request</p>
        )}
      </ul>
    </section>
  );
};

export default RecommendedBooks;