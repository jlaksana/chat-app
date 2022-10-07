import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { db } from "../firebase";

function Chats() {
  const [chats, setChats] = useState([]);

  const { curUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", curUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    curUser.uid && getChats();
  }, [curUser.uid]);
  console.log(Object.entries(chats));

  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => (
        <div className="userChats" key={chat[0]}>
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].userInfo.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;
