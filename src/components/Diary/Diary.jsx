import { useDispatch } from "react-redux";
import { deleteReadingSession, getBookInfo } from "../../redux/books/operations";
import { LuTrash2 } from "react-icons/lu";
import toast from "react-hot-toast";
import styles from "./Diary.module.css";

const Diary = ({ progress, bookId, totalPages }) => {
  const dispatch = useDispatch();

  const handleDelete = async (sessionId) => {
    try {
      await dispatch(deleteReadingSession({ bookId, sessionId })).unwrap();
      await dispatch(getBookInfo(bookId));
      toast.success("Record deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calcPages = (session) => {
    if (!session.finishPage || !session.startPage) return 0;
    return session.finishPage - session.startPage;
  };

  const calcMinutes = (session) => {
    if (!session.startReading || !session.finishReading) return 0;
    const diff = new Date(session.finishReading) - new Date(session.startReading);
    return Math.round(diff / 1000 / 60);
  };

  const calcPercent = (session) => {
    if (!totalPages) return 0;
    const pages = calcPages(session);
    return ((pages / totalPages) * 100).toFixed(2);
  };

  // групуємо по даті
  const completedSessions = progress.filter(s => s.status === "inactive");

  const grouped = completedSessions.reduce((acc, session) => {
    const date = formatDate(session.finishReading);
    if (!acc[date]) acc[date] = [];
    acc[date].push(session);
    return acc;
  }, {});

  if (!completedSessions.length) return null;

return (
  <div className={styles.wrapper}>
    <ul className={styles.diaryList}>
      {Object.entries(grouped).map(([date, sessions]) => {
        const totalPagesForDate = sessions.reduce((acc, s) => acc + calcPages(s), 0);

        return (
          <li key={date} className={styles.dateGroup}>
            <div className={styles.dateHeader}>
              <div className={styles.dateLeft}>
                <span className={styles.dateIcon} />
                <span className={styles.date}>{date}</span>
              </div>
              <span className={styles.pagesCount}>{totalPagesForDate} pages</span>
            </div>

            <ul className={styles.sessionList}>
              {sessions.map((session) => (
                <li key={session._id} className={styles.sessionItem}>
                  <div className={styles.left}>
                    <p className={styles.percent}>{calcPercent(session)}%</p>
                    <p className={styles.minutes}>{calcMinutes(session)} minutes</p>
                  </div>

                  <div className={styles.right}>
                    <div className={styles.topRight}>
                      <div className={styles.miniChart}>
                        <svg width="50" height="30" viewBox="0 0 50 30">
                          <polyline
                            points="0,30 50,0"
                            fill="none"
                            stroke="#30b94d"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <polygon
                            points="0,30 50,0 50,30"
                            fill="#30b94d"
                            opacity="0.3"
                          />
                        </svg>
                      </div>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(session._id)}
                      >
                        <LuTrash2 size={16} />
                      </button>
                    </div>
                    <p className={styles.speed}>{session.speed} pages<br/>per hour</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  </div>
);
};

export default Diary;
