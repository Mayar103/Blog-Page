import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../Services/auth";
import styles from "../Style/Login&Signup.module.css";
// import Avatar from "./Avatar";

function Signup() {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const print = () => {
    console.log(signupData.avatar);
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/users",
        AuthService.signup(
          signupData.username,
          signupData.email,
          signupData.password,
          signupData.avatar
        ).then(() => {
          window.location.reload();
          console.log(
            signupData.username,
            signupData.email,
            signupData.password,
            signupData.avatar
          );
        })
      )
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    return () => {
      setSignupData({
        username: "",
        email: "",
        password: "",
        avatar: "",
      });
    };
  }, []);

  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.loginContent}>
          <img
            className={styles.loginImg}
            src={"../src/assets/Images/Signup/signup.png"}
          />
          <h3 className={styles.head}>Lorem ipsum dolor consectetur.</h3>
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit sit amet
            adipisicing elit sit amet consectetur.
          </p>
          <div className={styles.icons}>
            <p className={styles.icon1}></p>
            <p className={styles.icon}></p>
            <p className={styles.icon}></p>
            <p className={styles.icon}></p>
          </div>
        </div>
        <form className={styles.loginForm} onSubmit={handleSignup}>
          <h3 className={styles.loginHeader}>Join GreenWish Family ❤</h3>
          <input
            type={"text"}
            placeholder={"Enter your name"}
            value={signupData.username}
            onChange={(event) =>
              setSignupData({ ...signupData, username: event.target.value })
            }
          />
          <input
            type={"text"}
            placeholder={"Enter your email"}
            value={signupData.email}
            onChange={(event) =>
              setSignupData({ ...signupData, email: event.target.value })
            }
          />
          <input
            type={"password"}
            placeholder={"Enter your password"}
            value={signupData.password}
            onChange={(event) =>
              setSignupData({ ...signupData, password: event.target.value })
            }
          />
          <div className={styles.avatar}>
            <input
              type="radio"
              value={signupData.avatar}
              name="avatar"
              className={styles.avatarRadio}
            />
            <img
              src={"../src/assets/Images/boy.png"}
              className={styles.avatar}
            />
            <input
              type="radio"
              name="avatar"
              className={styles.avatarRadio}
              onClick={print}
            />
            <img
              src={"../src/assets/Images/girl.png"}
              value={signupData.avatar}
              className={styles.avatar}
            />
          </div>
          <button className={styles.signupBtn}>Signup</button>
          <p className={styles.loginParagraph}>
            Already a GreenWish Member?{" "}
            <span onClick={goToLogin} className={styles.loginAccount}>
              Login..
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
