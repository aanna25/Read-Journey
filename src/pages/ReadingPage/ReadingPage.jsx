import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import AddReading from "../../components/AddReading/AddReading";
import Diary from "../../components/Diary/Diary";
import Statistics from "../../components/Statistics/Statistics";
import BookFinishModal from "../../components/BookFinishModal/BookFinishModal";
import { LuHourglass, LuRefreshCw } from "react-icons/lu";

import {
  startReading,
  stopReading,
  getBookInfo,
} from "../../redux/books/operations";
import { selectCurrentBook } from "../../redux/books/selectors";
import starIcon from "../../assets/star.png";
import styles from "./ReadingPage.module.css";

const ReadingPage = () => {
  const { id: bookId } = useParams();
  const dispatch = useDispatch();
  const book = useSelector(selectCurrentBook);

  const [activeTab, setActiveTab] = useState("diary");
  const [showFinishModal, setShowFinishModal] = useState(false);

  const progress = book?.progress || [];
  const hasProgress = progress.length > 0;
  const isReading =
    progress.length > 0 && progress[progress.length - 1].status === "active";

  useEffect(() => {
    dispatch(getBookInfo(bookId));
  }, [dispatch, bookId]);

  const handleStop = async (page) => {
    try {
      await dispatch(stopReading({ id: bookId, page })).unwrap();
      await dispatch(getBookInfo(bookId));
      if (page >= book?.totalPages) {
        setShowFinishModal(true);
      }
    } catch (error) {
      toast.error(error || "Failed to stop reading");
      await dispatch(getBookInfo(bookId));
    }
  };

  const handleStart = async (page) => {
    try {
      await dispatch(startReading({ id: bookId, page })).unwrap();
      await dispatch(getBookInfo(bookId));
    } catch (error) {
      toast.error(error || "Failed to start reading");
      await dispatch(getBookInfo(bookId));
    }
  };

  const renderEmptyState = () => (
    <div className={styles.emptyContainer}>
      <p className={styles.emptyText}>
        Here you will see when and how much you read. To record, click on the
        red button above.
      </p>
      <div className={styles.starWrapper}>
        <img src={starIcon} alt="Star" width="40" height="40" />
      </div>
    </div>
  );

  const renderBookDetails = () => {
    if (!book) {
      return <p className={styles.loadingText}>Loading book details...</p>;
    }

    return (
      <>
        <div className={styles.coverContainer}>
          <img
            src={book.imageUrl}
            alt={book.title}
            className={styles.bookImage}
          />
        </div>
        <h3 className={styles.bookName}>{book.title}</h3>
        <p className={styles.bookAuthor}>{book.author}</p>
      </>
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <Dashboard>
          <AddReading
            isReading={isReading}
            onStart={handleStart}
            onStop={handleStop}
            totalPages={book?.totalPages}
          />

          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <h3 className={styles.detailsTitle}>
                {!hasProgress && !isReading
                  ? "Progress"
                  : activeTab === "diary"
                    ? "Diary"
                    : "Statistics"}
              </h3>
              {(hasProgress || isReading) && (
                <div className={styles.tabControls}>
                  <button
                    className={
                      activeTab === "diary" ? styles.activeTab : styles.tabBtn
                    }
                    onClick={() => setActiveTab("diary")}
                    aria-label="Diary view"
                  >
                    <LuHourglass size={18} />
                  </button>
                  <button
                    className={
                      activeTab === "statistics"
                        ? styles.activeTab
                        : styles.tabBtn
                    }
                    onClick={() => setActiveTab("statistics")}
                    aria-label="Statistics view"
                  >
                    <LuRefreshCw size={18} />
                  </button>
                </div>
              )}
            </div>

            {!hasProgress && !isReading ? (
              renderEmptyState()
            ) : (
              <div className={styles.tabContent}>
                {activeTab === "diary" ? (
                  <Diary
                    progress={progress}
                    bookId={bookId}
                    totalPages={book?.totalPages}
                  />
                ) : (
                  <Statistics
                    progress={progress}
                    totalPages={book?.totalPages}
                  />
                )}
              </div>
            )}
          </div>
        </Dashboard>

        <section className={styles.myBookSection}>
          <h2 className={styles.title}>My reading</h2>
          <div className={styles.bookWorkplace}>
            {renderBookDetails()}
            <button
              type="button"
              className={`${styles.statusCircle} ${isReading ? styles.reading : ""}`}
              aria-label={isReading ? "Reading in progress" : "Not reading"}
              disabled
            />
          </div>
        </section>
      </main>

      {showFinishModal && (
        <BookFinishModal onClose={() => setShowFinishModal(false)} />
      )}
    </div>
  );
};

export default ReadingPage;
