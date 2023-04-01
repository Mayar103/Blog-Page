import axios from "axios";
import React, { useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const handleAPI = () => {
    const formData = new FormData();
    formData.append("image", image);
    axios.post("http://localhost:3000/Blogs", formData).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <input type="file" name="img" onChange={handleImage} />
      <button onClick={handleAPI}>Submit</button>
    </div>
  );
}

export default ImageUpload;
