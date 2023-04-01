import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../Style/Blog.module.css";


function Pagination() {
  const [posts, setPosts] = useState([]);
  const [noOfPages, setNoOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const pageSize = 6;

  const btnActive = styles.btnActive;
  const pagBtn = styles.pagBtn;

  const changeCurrentPage = (page) => {
    setCurrentPage(page);
  };

  // let postsToRender =
  //   currentPage === 0
  //     ? posts
  //     : posts.filter((item) => {
  //         item.page === currentPage;
  //       });

  let pages = Array(noOfPages)
    .fill(0)
    .map((item, i) => i + 1);

  // const start = currentPage * pageSize - pageSize;
  // const end = start + pageSize;

  // const postsToRender = posts.slice(start, end);
  // console.log(postsToRender);
  // // setPosts(postsToRender)

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBlogData = posts.slice(startIndex, endIndex);

  useEffect(() => {
    axios.get("http://localhost:3000/Blogs").then((res) => {
      setPosts(res.data);
      setNoOfPages(Math.ceil(res.data.length / pageSize));
    });
  }, []);

  return (
    <div className={styles.pagination}>
      {currentBlogData.map((page) => (
        <button
          key={page}
          onClick={() => changeCurrentPage(page)}
          className={`${currentPage === page ? btnActive : pagBtn}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
