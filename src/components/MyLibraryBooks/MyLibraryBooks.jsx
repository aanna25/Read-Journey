import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { selectUserBooks } from "../../redux/books/selectors";
import { deleteBook, fetchUserBooks } from "../../redux/books/operations";
import toast from "react-hot-toast";
import BookCard from "../BookCard/BookCard";
import bookIcon from "../../assets/books.png";
import Filters from "../Filters/Filters";
import BookDetailsModal from "../BookDetailsModal/BookDetailsModal";
import styles from "./MyLibraryBooks.module.css";

const MyLibraryBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectUserBooks);
  const [filter, setFilter] = useState("all");
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(fetchUserBooks());
  }, [dispatch]);

  const filteredBooks = books.filter(
    (book) => filter === "all" || book.status === filter
  );

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBook(id)).unwrap();
      toast.success("Book removed successfully", {
        style: {
          borderRadius: "12px",
          background: "#F9F9F9",
          color: "#262626",
        },
      });
    } catch {
      toast.error("Failed to delete book");
    }
  };

  const handleOpenModal = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>My library</h2>
        <Filters filter={filter} setFilter={setFilter} />
      </div>
      {books.length > 0 ? (
        <ul className={styles.bookList}>
          {filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onDelete={() => handleDelete(book._id)}
              onClick={() => handleOpenModal(book)}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.iconWrapper}>
            <img src={bookIcon} alt="Books" width="40" height="40" />
          </div>
          <p className={styles.emptyText}>
            To start training, add <span>some of your books</span> or from the
            recommended ones
          </p>
        </div>
      )}
      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          onClose={handleCloseModal}
          onStart={(id) => {
            console.log("Start reading:", id);
            // місце для navigate(`/reading/${id}`)
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default MyLibraryBooks;
