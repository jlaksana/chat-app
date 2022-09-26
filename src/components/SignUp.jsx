import { Link } from "react-router-dom";
import "../styles/Auth.css";

function SignUp() {
  const handleSubmit = () => {};

  return (
    <div className="auth">
      <h3>Chat Application</h3>
      <p>Sign Up</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="display-name"
          name="display-name"
          placeholder="Display Name"
        />
        <input type="email" id="email" name="email" placeholder="Email" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignUp;
