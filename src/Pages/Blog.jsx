import React, { useEffect, useState } from "react";
import AddPost from "../Components/AddPost";
import axios from "axios";
import LoginWarning from "../Components/LoginNote";
import AuthService from "../Services/auth";
import EditPost from "../Components/Edit";
import styles from "../Style/Blog.module.css";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPostId, setEditingPostId] = useState(null);
  const [display, setDisplay] = useState(false);

  const itemsPerPage = 9;

  const btnActive = styles.btnActive;
  const pagBtn = styles.pagBtn;

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
    setDisplay(true);
  };

  const removeOverlay = () => {
    setShowOverlay(false);
  };

  const noOfPages = Math.ceil(posts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogData = posts.slice(startIndex, endIndex);

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

  const searchPosts = () => {
    const filteredPosts = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setPosts(filteredPosts);
  };

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

  useEffect(() => {
    axios.get("http://localhost:3000/Blogs").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className={styles.blogPage}>
      <div className={styles.con}>
        <div>
          <h2 className={styles.blogHead}>
            World population grows, so does our impact on the environment.
          </h2>
          <p className={styles.blogPara}>
            Our actions are taking a toll on the planet we call home. It's time
            to take action will help us protect the environment for future
            generations..
          </p>
        </div>
        <div>
          <img src={"../../src/assets/Images/gh.jpg"} className={styles.bgc} />
        </div>
      </div>
      <div className={styles.contain}>
        <div className={styles.search}>
          <input
            type="text"
            value={searchQuery}
            className="searchInp"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => searchPosts()} className="search">
            Search
          </button>
        </div>
        <div className={styles.nnnnn}>
          <div className={styles.ii}>
            {currentBlogData.map((post) => (
              <div key={post?.id} className={styles.blogCard}>
                <img src={`Data/${post.img}`} className={styles.blogImg} />
                <div className={styles.aio}>
                  <span className={styles.authorName}>{post?.authorName}</span>
                  <span className={styles.date}>{currentDate(post?.date)}</span>
                </div>
                <div className={styles.aio}>
                  <h5 className={styles.title}>{post?.title}</h5>
                  {localStorage.getItem("userToken") &&
                  post?.authorName === AuthService.getUser() ? (
                    // <div className={styles.nm}>
                    <div key={post?.id}>
                      <div className={styles.head}>
                        <h5 className={styles.title}>{posts.title}</h5>
                        <div className={styles.bttns}>
                          <button
                            onClick={() => setEditingPostId(post.id)}
                            className={styles.edit}
                          >
                            Edit
                          </button>
                          <button
                            type="submit"
                            className={styles.delete}
                            onClick={() => handleDelete(post.id)}
                          >
                            Delete
                          </button>
                        </div>
                        <p>{posts.content}</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <p className={styles.blogPara}>{post?.content}</p>
                {post?.id === editingPostId ? (
                  <div>
                    {editingPostId && (
                      <EditPost
                        postId={editingPostId}
                        onUpdatePost={handleUpdatePost}
                        onCancel={() => setEditingPostId(null)}
                      />
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pagination}>
          {Array.from(Array(noOfPages).keys()).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`${
                pageNumber + 1 === currentPage ? btnActive : pagBtn
              }`}
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button className={styles.blogBtn} onClick={toggleOverlay}>
          +
        </button>
        {localStorage.getItem("userToken")
          ? showOverlay && (
              <div>
                <div className={styles.overlay} onClick={removeOverlay}></div>
                <AddPost
                  removeOverlay={removeOverlay}
                  posts={posts}
                  setPosts={setPosts}
                  setDisplay={setDisplay}
                  display={display}
                />
              </div>
            )
          : showOverlay && (
              <div>
                <div className={styles.overlay} onClick={removeOverlay}></div>
                {showOverlay && <LoginWarning removeOverlay={removeOverlay} />}
              </div>
            )}
      </div>
    </div>
  );
}

export default Blog;
