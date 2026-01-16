import AddBook from "../AddBook/AddBook";
import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import MyLibraryBooks from "../MyLibraryBooks/MyLibraryBooks";
import RecommendedWidget from "../RecommendedWidget/RecommendedWidget";
import styles from "./MyLibraryPage.module.css";

const MyLibraryPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <Dashboard>
          <AddBook />
          <RecommendedWidget />
        </Dashboard>
        <MyLibraryBooks />
      </main>
    </div>
  );
};

export default MyLibraryPage;
