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
import BookModal from "../BookModal/BookModal";

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

  const [selectedBook, setSelectedBook] = useState(null); //modalBook

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

  //modalBook
  const handleOpenModal = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleAddToLibrary = (id) => {
    console.log("додано книгу з айді:", id);
    // тут буде dispatch(addBookToLibrary(id))
    handleCloseModal();
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
          books.map((book) => (
            <li
              key={book._id}
              className={styles.item}
              onClick={() => handleOpenModal(book)}
            >
              <img
                src={book.imageUrl || "https://via.placeholder.com/137x208"}
                alt={book.title}
                className={styles.img}
              />
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookAuthor}>{book.author}</p>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.noBooks}>No books found for your request</p>
        )}
      </ul>
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleCloseModal}
          onAdd={handleAddToLibrary}
        />
      )}
    </section>
  );
};

export default RecommendedBooks;
