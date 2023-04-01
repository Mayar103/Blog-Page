import { useNavigate } from "react-router-dom";
import styles from "../Style/Home.module.css";

function Home() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signup");
  };

  const goToBlog = () => {
    navigate("blog");
  };

  return (
    <div>
      <div className={styles.contain}>
        <div className={styles.content}>
          <div className={styles.green}>Go Green</div>
          <h1 className={styles.homeHead}>
            Environment is everyone's responsibility
          </h1>
          <p className={styles.homePara}>
            We won't have a society if we destroy the environment.
          </p>
          <button className={styles.homeBtn} onClick={goToSignUp}>
            JOIN US NOW
          </button>
          <button className={styles.homeBtn1} onClick={goToBlog}>
            Explore Blogs
          </button>
        </div>
        <div className={styles.back}>
          <div className={styles.im}></div>
          <img
            src={"../src/assets/Images/Home/homePage.PNG"}
            className={styles.imgh}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
