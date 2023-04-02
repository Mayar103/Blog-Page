import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthService from "../Services/auth";
import styles from "../Style/Nav.module.css";

function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  const showProfile = () => {
    navigate("/profile");
  };

  return (
    <div className={styles.nav}>
      <ul>
        <img
          src={"../../src/assets/Images/Nav/logo.png"}
          className={styles.img}
        />
      </ul>
      <ul>
        <li>
          <Link to="/" className={styles.list}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/blog" className={styles.list}>
            Blog
          </Link>
        </li>
        {localStorage.getItem("userToken") ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <ul>
            <li>
              <Link to="/formikLogin" className={styles.list}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/signupForm" className={styles.list}>
                Signup
              </Link>
            </li>
          </ul>
        )}
      </ul>
      <ul>
        {localStorage.getItem("userToken") ? (
          <li>Hi, {AuthService.getUser()}</li>
        ) : (
          ""
        )}

        <li>
          {localStorage.getItem("userToken") &&
          AuthService.getGender() === "female" ? (
            <div>
              <img
                src={"../src/assets/Images/girl.png"}
                className="avatar"
                onClick={showProfile}
              />
            </div>
          ) : (
            ""
          )}
          {localStorage.getItem("userToken") &&
          AuthService.getGender() === "male" ? (
            <img
              src={"../src/assets/Images/boy.png"}
              className="avatar"
              onClick={showProfile}
            />
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
}

export default Nav;
