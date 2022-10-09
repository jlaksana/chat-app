import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import "../styles/Auth.css";

function SignUp() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          //Update profile
          await updateProfile(user, {
            displayName,
            photoURL: downloadURL,
          });
          //create user on firestore
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          //create empty user chats on firestore
          await setDoc(doc(db, "userChats", user.uid), {});
          navigate("/");
        });
      });
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

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
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required
        />
        <div>
          <p>Upload Profile Picture</p>
          <input type="file" name="Avatar" required />
        </div>
        {loading && "Uploading image..."}
        {error && (
          <span className="error">
            Something went wrong. Try with a different email or longer password
          </span>
        )}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignUp;
