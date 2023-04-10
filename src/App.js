import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const userLocalStorage = JSON.parse(
      window.localStorage.getItem("loggedBlogUser")
    );
    if (userLocalStorage) {
      setUser(userLocalStorage);
      const returnedToken = loginService.setToken(userLocalStorage.token);
      setToken(returnedToken);
      blogService.getAll(returnedToken).then((blogs) => setBlogs(blogs));
    }
  }, []);

  const showLogin = () => (
    <>
      <h3>login to application</h3>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button>login</button>
      </form>
    </>
  );

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>

      <p>
        {`${user.username} is logged in`}{" "}
        <button onClick={handleLogout}>logout</button>{" "}
      </p>
      {createNewBlog()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
      user: user.id,
    };

    await blogService.createNew(newBlog, token);
    const returnedBlogs = await blogService.getAll(token);
    setBlogs(returnedBlogs);

    resetBlogFields();
  };

  const resetBlogFields = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const createNewBlog = () => (
    <>
      <h3>Create new</h3>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input
            type="text"
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            name="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            name="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button>Create</button>
      </form>
    </>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await loginService.login(username, password);
      setUser(loggedUser);
      const returnedToken = loginService.setToken(loggedUser.token);
      setToken(returnedToken);
      const returnedBlogs = await blogService.getAll(returnedToken);
      setBlogs(returnedBlogs);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));
    } catch (error) {
      console.log("wrong credentials");
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return <>{user ? showBlogs() : showLogin()}</>;
};

export default App;
