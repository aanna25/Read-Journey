import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import Quote from "../../components/Quote/Quote";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks";
import UserNav from "../../components/UserNav/UserNav";
import styles from "./RecommendedPage.module.css";

const RecommendedPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <Dashboard>
          <FiltersForm />
          <UserNav />
          <Quote />
        </Dashboard>
        <RecommendedBooks />
      </main>
    </div>
  );
};

export default RecommendedPage;