import { useState } from "react";

import blogService from "../services/blogs";

const Blog = ({ blog, token }) => {
  const [show, setShow] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleShow = () => setShow(!show);

  const increaseLike = async () => {
    const updatedLikeBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likeCount + 1,
      user: blog.user.id,
      id: blog.id,
    };
    await blogService.updateBlog(updatedLikeBlog, token);
    setLikeCount(likeCount + 1);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleShow}>{show ? "hide" : "view"}</button>
      {show && (
        <>
          <br />
          {blog.url}
          <br />
          likes {likeCount} <button onClick={increaseLike}>like</button>
          <br />
          {blog.user.username}
        </>
      )}
    </div>
  );
};

export default Blog;
