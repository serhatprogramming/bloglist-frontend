import { useState } from "react";

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleShow = () => setShow(!show);

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleShow}>{show ? "hide" : "view"}</button>
      {show && (
        <>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} <button>like</button>
          <br />
          {blog.user.username}
        </>
      )}
    </div>
  );
};

export default Blog;
