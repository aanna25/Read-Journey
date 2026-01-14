import Header from "../Header/Header";
import styles from "./MyLibraryPage.module.css";

const MyLibraryPage = () => {
  return (
    <div className={styles.pageWrapper}>
     <Header />
      <main className={styles.mainContent}></main>


    </div>
  )
}

export default MyLibraryPage