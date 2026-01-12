import { useLocation } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";

import styles from "./AuthPage.module.css";

import iphoneDeskX1 from "../../../public/img/iphone-desk@1x.webp";
import iphoneDeskX2 from "../../../public/img/iphone-desk@2x.webp";
import iphoneMobX1 from "../../../public/img/iphone-mob@1x.webp";
import iphoneMobX2 from "../../../public/img/iphone-mob@2x.webp";

const AuthPage = () => {
  const location = useLocation();
  const isRegisterRoute = location.pathname === "/register";

  return (
    <div className={styles.authContainer}>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>
          Expand your mind, reading{" "}
          <span className={styles.titleGray}>a book</span>
        </h1>

        <div className={styles.formWrapper}>
          {isRegisterRoute ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>

      <div className={styles.rightSection}>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={`${iphoneDeskX1} 1x, ${iphoneDeskX2} 2x`}
          />
          <source
            media="(min-width: 768px)"
            srcSet={`${iphoneMobX1} 1x, ${iphoneMobX2} 2x`}
          />
          <img
            src={iphoneDeskX1}
            alt="Phone mockup with app interface"
            className={styles.phoneImage}
          />
        </picture>
      </div>
    </div>
  );
};

export default AuthPage;
