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

  useEffect(() => {
    if (loginService.token) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
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
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            id="password"
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
      <p>{`${user.username} is logged in`}</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
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
    } catch (error) {
      console.log("wrong credentials");
    }
  };

  return <>{user ? showBlogs() : showLogin()}</>;
};

export default App;
