import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import AuthService from "../Services/auth";
import styles from "../Style/Login&Signup.module.css";

function LoginForm() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signup");
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    await axios
      .post("http://localhost:4000/login", values)
      .then((res) => {
        localStorage.setItem("userToken", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => {
        confirm("Invalid username or password");
      });

    setSubmitting(false);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContent}>
        <img
          src={"../src/assets/Images/Login/login.png"}
          className={styles.loginImg}
        />
        <h3 className={styles.head}>You're a key to protect environment</h3>
        <p className={styles.paragraph}>
          Moving away from a meat-dominated diet towards a more plant-based diet
          can lower your impact on the environment.
        </p>
        <div className={styles.icons}>
          <p className={styles.icon1}></p>
          <p className={styles.icon}></p>
          <p className={styles.icon}></p>
          <p className={styles.icon}></p>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.loginForm}>
            <h3 className={styles.loginHeader}>Welcome Back to GreenWish ❤</h3>
            <Field type="email" name="email" placeholder="Enter your email" />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.loginError}
            />
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.loginError}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.loginBtn}
            >
              Login
            </button>
            <p className={styles.loginParagraph}>
              New GreenWish Member?
              <span onClick={goToSignUp} className={styles.loginAccount}>
                Create Account..
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
