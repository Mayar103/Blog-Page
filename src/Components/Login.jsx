import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "../Services/auth";
import styles from "../Style/Login&Signup.module.css";

function Login() {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:4000/login",
        AuthService.login(loginData.email, loginData.password).then(() => {
          navigate("/");
        })
      )
      .then((res) => {
        setPost(loginData.email, loginData.password);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    return () => {
      setloginData({
        email: "",
        password: "",
      });
    };
  }, []);

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContent}>
        <img
          src={"../src/assets/Images/Login/login.png"}
          className={styles.loginImg}
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
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h3 className={styles.loginHeader}>Welcome Back to GreenWish ❤</h3>
        <input
          type={"text"}
          placeholder={"Enter your email"}
          value={loginData.email}
          onChange={(event) =>
            setloginData({ ...loginData, email: event.target.value })
          }
        />
        <input
          type={"password"}
          placeholder={"Enter your password"}
          value={loginData.password}
          onChange={(event) =>
            setloginData({ ...loginData, password: event.target.value })
          }
        />
        <button className={styles.loginBtn}>Login</button>
        <p className={styles.loginParagraph}>
          New GreenWish Member?
          <span onClick={goToSignUp} className={styles.loginAccount}>
            Create Account..
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
