import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { ChatContext } from "../ChatContext";
import { db } from "../firebase";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { curUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const searchUser = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
      console.log(error);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      searchUser();
    }
  };

  const handleSelect = async () => {
    const combinedID =
      curUser.uid > user.uid ? curUser.uid + user.uid : user.uid + curUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedID));

      if (!res.exists()) {
        // create a new chat between the users
        await setDoc(doc(db, "chats", combinedID), { messages: [] });
        // update user chat for current user
        await updateDoc(doc(db, "userChats", curUser.uid), {
          [combinedID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
        // update other
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID + ".userInfo"]: {
            uid: curUser.uid,
            displayName: curUser.displayName,
            photoURL: curUser.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
      }
      dispatch({
        type: "CHANGE_USER",
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });
    } catch (error) {
      setErr(true);
      console.log(error);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {err && <span>No user found</span>}
      {user && (
        <div className="userChats" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
