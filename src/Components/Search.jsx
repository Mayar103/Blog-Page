import { useState } from "react";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchBlogPosts = () => {
    const filteredBlogPosts = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setPosts(filteredBlogPosts);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        className="searchInp"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit" className="search" onClick={() => searchQuery()}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
