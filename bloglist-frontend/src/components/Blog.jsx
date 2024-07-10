import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [detailsVisibile, setDetailsVisible] = useState(false)
  const showWhenVisible = { display: detailsVisibile ? '' : 'none' }
  const buttonTag = detailsVisibile ? 'Hide' : 'View'
  const toggleVisibility = () => setDetailsVisible(!detailsVisibile)
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - <i>{blog.author}</i>
        <button style={{ marginLeft: 10 }} onClick={toggleVisibility}>{buttonTag}</button>
      </div>
      <div style={showWhenVisible}>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes} <button>like</button></p>
        <p>User: {blog.user ? blog.user.name : ''}</p>
      </div>
    </div>
  );
};

export default Blog;
