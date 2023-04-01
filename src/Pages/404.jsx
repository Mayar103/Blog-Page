import { useNavigate } from "react-router-dom";
import styles from "../Style/404.module.css";

function Error() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };
  return (
    <div className={styles.errorPage}>
      <div>
        <img
          src={"../src/assets/Images/Error/error.PNG"}
          className={styles.errorImg}
        />
      </div>
      <div className={styles.errorContent}>
        <h1 className={styles.errorHead}>
          Oooops, the page you're looking for doesn't exist!!
        </h1>
        <button className={styles.errorBtn} onClick={goToHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Error;
