import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import Signup from "./Components/Signup";
import Blog from "./Pages/Blog";
import AddPost from "./Components/AddPost";
import Error from "./Pages/404";
import LoginNote from "./Components/LoginNote";
import LoginForm from "./Pages/FormikLogin";
import SignupForm from "./Pages/FormikSignup";
import Edit from "./Components/Edit";
import Profile from "./Pages/Profile";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  function handleDelete(postId) {
    axios.delete(`http://localhost:3000/Blogs/${postId}`).then((res) => {
      const updatedBlogPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedBlogPosts);
    });
  }
  const handleUpdatePost = (updatedPost) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.findIndex((post) => post.id === updatedPost.id);
    updatedPosts[index] = updatedPost;
    console.log(updatedPost);
    setPosts(updatedPosts);
  };

  const currentDate = (date) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/Blogs").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formikLogin" element={<LoginForm />} />
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/blog"
            element={
              <Blog
                posts={posts}
                setPosts={setPosts}
                handleUpdatePost={handleUpdatePost}
                handleDelete={handleDelete}
                currentDate={currentDate}
              />
            }
          />
          <Route path="/addPost" element={<AddPost />} />

          <Route path="/loginWarning" element={<LoginNote />} />
          <Route
            path="/profile"
            element={
              <Profile
                posts={posts}
                setPosts={setPosts}
                handleUpdatePost={handleUpdatePost}
                handleDelete={handleDelete}
                currentDate={currentDate}
              />
            }
          />

          <Route path="*" element={<Error />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
