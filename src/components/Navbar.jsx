import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { ChatContext } from "../ChatContext";
import { auth } from "../firebase";

function Navbar() {
  const { curUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  return (
    <div className="navbar">
      <span className="logo">
        <b>Chat App</b>
      </span>
      <div className="user">
        <img src={curUser.photoURL} alt="" />
        <span>{curUser.displayName}</span>
        <button
          onClick={() => {
            signOut(auth);
            dispatch({ type: "END_USER" });
          }}
        >
          sign out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
