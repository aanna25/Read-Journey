import styles from "./Dashboard.module.css";

const Dashboard = ({ children }) => {
  return (
    <aside className={styles.dashboard}>
      {children}
    </aside>
  );
};

export default Dashboard;