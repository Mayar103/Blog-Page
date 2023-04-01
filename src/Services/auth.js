import axios from "axios";

const APIURL = "http://localhost:4000";

class AuthService {
  login(email, password) {
    return axios
      .post(APIURL + "/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("userToken", JSON.stringify(res.data));
          // window.location.href = "/";
          // window.location.href = "/login";
        }
        return res.data;
      });
  }

  logout() {
    localStorage.removeItem("userToken");
    // e.preventDefault();
    // window.history.back();
    // window.location.href = "/login";
  }

  signup(username, email, password, gender) {
    return axios.post(APIURL + "/signup", {
      username,
      email,
      password,
      gender,
    });
  }

  getUser() {
    return JSON.parse(localStorage.getItem("userToken")).user.username;
  }

  getGender() {
    return JSON.parse(localStorage.getItem("userToken")).user.gender;
  }
}

export default new AuthService();
