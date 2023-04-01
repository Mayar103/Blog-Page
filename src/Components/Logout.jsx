import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/auth";
import styles from "../Style/Nav.module.css";

function Logout() {
  const navigate = useNavigate;

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.reload();
    AuthService.logout();
    navigate("/");
    // props.handleLogout;
  };

  return (
    <a onClick={handleLogout} className={styles.list}>
      Logout
    </a>
  );
}

export default Logout;
