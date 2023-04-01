import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Style/LoginWarning.module.css";

function LoginNote(props) {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/formikLogin");
  };

  return (
    <div className={styles.addPost}>
      <div className={styles.pooost}>
        <img
          src={"../src/assets/Images/Signup/signup.png"}
          className={styles.imggg}
        />
        <h2 className={styles.seconderyHead}>
          you can't add post right now.. please login first‼
        </h2>
        <button className={styles.warningBtn} onClick={goToLogin}>
          Go to Login
        </button>
        <p className={styles.warningPara}>
          we can't wait to see your experience in saving environment
        </p>
      </div>
      <div>
        <button className={styles.warningClose} onClick={props.removeOverlay}>
          X
        </button>
      </div>
    </div>
  );
}

export default LoginNote;
