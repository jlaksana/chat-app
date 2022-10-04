import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">
        <b>Chat App</b>
      </span>
      <div className="user">
        <img
          src="https://yt3.ggpht.com/yti/AJo0G0m2egONOVNB8hOHJjp8jrtrJY6cKd0ZB-HFi77Epg=s88-c-k-c0x00ffffff-no-rj-mo"
          alt=""
        />
        <span>Jonathan</span>
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          sign out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
