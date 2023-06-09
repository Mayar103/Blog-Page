import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Style/Blog.module.css";

function EditPost({ postId, onUpdatePost, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  let obj = {};

  if (title) {
    obj.title = title;
  }

  if (content) {
    obj.content = content;
  }

  if (img) {
    obj.img = img;
  }

  const formData = new FormData();

  formData.append("title", obj.title);
  formData.append("content", obj.content);
  formData.append("img", obj.img);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/Blogs/${postId}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setImg(response.data.img);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSaving(true);

    axios
      .patch(`http://localhost:3000/Blogs/${postId}`, formData)
      .then((response) => {
        onUpdatePost(response.data);
        setIsSaving(true);
        setTimeout(() => {
          onCancel();
        }, 200);
      })
      .catch((error) => {
        console.log(error);
        setIsSaving(false);
      });
  };

  const handleImage = (e) => {
    console.log(e.target.files);
    setImg(e.target.files[0]);
  };

  return (
    <div className={styles.editForm}>
      <form onSubmit={handleSubmit} className={styles.editt}>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <textarea
          id="content"
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <br />
        <input
          id="img"
          type={"file"}
          // value={img}
          onChange={handleImage}
        />
        <div className={styles.btns}>
          <button type="submit" disabled={isSaving} className={styles.saveBtn}>
            Save
          </button>
          <button type="button" onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
