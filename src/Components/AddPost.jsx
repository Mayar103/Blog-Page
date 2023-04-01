import React, { useState } from "react";
import axios from "axios";
import AuthService from "../Services/auth";
import { useNavigate } from "react-router-dom";
import styles from "../Style/AddPost.module.css";

function AddPost(props) {
  const [image, setImage] = useState(null);

  const [post, setPost] = useState({
    title: "",
    authorName: "",
    content: "",
    date: "",
  });

  const remove = () => {
    setDisplay(false);
  };
  let dis;

  // if (display) {
  //   dis = styles.notDisplay;
  // } else {
  //   dis = styles.display;
  // }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    props.removeOverlay;
    e.preventDefault();
    navigate("/blog");

    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("authorName", AuthService.getUser());
    formData.append("img", image);
    formData.append("content", post.content);
    formData.append("date", new Date());

    await axios
      .post("http://localhost:3000/Blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setPost(res.data);
        props.setPosts([...props.posts, res.data]);
        setTimeout(() => {
          props.removeOverlay();
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const onChangePostImg = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    // const newErrors = { ...errors };
    // delete newErrors.postImg;
  };

  return (
    <div className={styles.addPost}>
      <div className={styles.pooost}>
        <img
          src={"../src/assets/Images/AddPost/postImg.png"}
          className={styles.imggg}
        />
        <form className={styles.postForm} onSubmit={handleSubmit}>
          <h3 className={styles.postHead}>Share Your Experience ♻</h3>
          <textarea
            type={"text"}
            placeholder={"Add Title"}
            name="title"
            value={post.title}
            onChange={handleInputChange}
          ></textarea>
          <textarea
            type={"text"}
            name="content"
            placeholder={"Add Description"}
            value={post.content}
            onChange={handleInputChange}
            required
          ></textarea>
          <input
            type={"file"}
            name="img"
            placeholder={"Upload img"}
            // value={post.img}
            onChange={onChangePostImg}
            required
          />
          <button
            className={styles.postBtn}
            // className={dis}
            // {display ? className= styles.notDisplay : ""}

            // className={display ? styles.notDisplay : styles.display}
            // type="submit"
            // onClick={remove}
          >
            Confirm
          </button>
          <p className={styles.postPara}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </form>
      </div>
      <div>
        <button className={styles.postClose} onClick={props.removeOverlay}>
          X
        </button>
      </div>
    </div>
  );
}

export default AddPost;
