import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const handleSubmit = () => {};

  return (
    <div className="auth">
      <h3>Chat Application</h3>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <input type="email" id="email" name="email" placeholder="Email" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
