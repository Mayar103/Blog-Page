import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "../Services/auth";
import styles from "../Style/Profile.module.css";

function Profile(props) {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const goToBlog = () => {
    navigate("/blog");
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
    <div>
      <div className={styles.ii}>
        {posts.map((post) => (
          <div key={post?.id} className={styles.bloggCard}>
            {post.authorName === AuthService.getUser() ? (
              <div>
                <div className={styles.contain}>
                  <div>
                    <img src={`Data/${post.img}`} className={styles.blogImg} />
                  </div>
                  <div className={styles.contain2}>
                    <div className={styles.head}>
                      <h5 className={styles.title}>{post?.title}</h5>
                      <span className={styles.date}>
                        {currentDate(post?.date)}
                      </span>
                    </div>
                    <p className={styles.profilePara}>{post?.content}</p>
                    <div className={styles.aio}>
                      {localStorage.getItem("userToken") &&
                      post?.authorName === AuthService.getUser() ? (
                        <div key={post?.id}>
                          <h5>{props.posts.title}</h5>
                          <p>{props.posts.content}</p>
                          <div className={styles.bttns}>
                            <button onClick={goToBlog} className={styles.view}>
                              View
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.aio}></div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}

        {/* {post?.id === editingPostId ? (
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
              )} */}
      </div>
    </div>
  );
}

export default Profile;
