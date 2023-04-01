import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../Style/Login&Signup.module.css";

function SignupForm({ setUser }) {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
    gender: "female",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    await axios
      .post("http://localhost:4000/signup", values)
      .then(() => {
        // window.location.reload();
        console.log(values);
        navigate("/");
      })
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setSubmitting(false);
  };

  return (
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form className={styles.loginForm}>
            <h3 className={styles.loginHeader}>Join GreenWish Family ❤</h3>
            <Field type="text" name="username" placeholder="Enter your name" />
            <ErrorMessage
              name="username"
              component="div"
              className={styles.loginError}
            />
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
            <div className={styles.avatar}>
              <img
                src={"../src/assets/Images/girl.png"}
                className={styles.avatar}
              />
              <input
                type="radio"
                name="gender"
                value="female"
                checked={values.gender === "female"}
                onChange={handleChange}
              />
              <img
                src={"../src/assets/Images/boy.png"}
                className={styles.avatar}
              />
              <input
                type="radio"
                name="gender"
                value="male"
                checked={values.gender === "male"}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.signupBtn}
            >
              Signup
            </button>
            <p className={styles.loginParagraph}>
              Already a GreenWish Member?
              <span onClick={goToLogin} className={styles.loginAccount}>
                Login..
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignupForm;
