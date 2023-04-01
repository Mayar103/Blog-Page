// const BlogPostEditor = ({ location, history }) => {
//   const { post } = location.state;
//   const [title, setTitle] = useState(post.title);
//   const [summary, setSummary] = useState(post.summary);
//   const [content, setContent] = useState(post.content);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Update JSON file with new data and navigate back to blog page
//     const updatedPost = { ...post, title, summary, content };
//     // Use fetch or Axios to make a PUT request to update the JSON file
//     fetch(`/data/blogData.json/${post.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedPost),
//     })
//       .then((response) => {
//         if (response.ok) {
//           history.push("/blog");
//         } else {
//           console.error(response);
//         }
//       })
//       .catch((error) => console.error(error));
//   };

//   return (
//     <div>
//       <h1>Edit Blog Post</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title:</label>
//           <input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(event) => setTitle(event.target.value)}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogPostEditor