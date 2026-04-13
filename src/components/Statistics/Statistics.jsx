import styles from "./Statistics.module.css";

const Statistics = ({ progress, totalPages }) => {
  const pagesRead = progress
    .filter(s => s.status === "inactive")
    .reduce((acc, s) => acc + (s.finishPage - s.startPage), 0);

  const percent = totalPages
    ? Math.min(Math.round((pagesRead / totalPages) * 100), 100)
    : 0;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </p>

      <div className={styles.chartWrapper}>
        <svg width="200" height="200" className={styles.svg}>
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#2e2e2e"
            strokeWidth="12"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#30b94d"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className={styles.percentLabel}>{percent}%</div>
      </div>

      <div className={styles.legend}>
        <span className={styles.dot} />
        <div>
          <p className={styles.percentText}>{percent}%</p>
          <p className={styles.pagesText}>{pagesRead} pages read</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;