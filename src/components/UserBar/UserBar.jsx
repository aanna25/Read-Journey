import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import styles from "./UserBar.module.css";

const UserBar = () => {
  const user = useSelector(selectUser);

  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className={styles.userBar}>
      <div className={styles.avatar}>{userInitial}</div>
      <p className={styles.userName}>{user?.name || "User Name"}</p>
    </div>
  );
};

export default UserBar;
