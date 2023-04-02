import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import AddPost from "./Components/AddPost";
import Error from "./Pages/404";
import LoginNote from "./Components/LoginNote";
import LoginForm from "./Pages/FormikLogin";
import SignupForm from "./Pages/FormikSignup";
import Edit from "./Components/Edit";
import Profile from "./Pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formikLogin" element={<LoginForm />} />
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/loginWarning" element={<LoginNote />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
