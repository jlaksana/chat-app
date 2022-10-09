import { Timestamp } from "firebase/firestore";
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthContext";
import { ChatContext } from "../ChatContext";

function Message({ message }) {
  const { curUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isOwner = message.senderID === curUser.uid;

  const calculateTimeStamp = () => {
    const secondsAgo = Timestamp.now().seconds - message.date.seconds;
    if (secondsAgo < 10) {
      return "just now";
    } else if (secondsAgo < 60) {
      return `${secondsAgo} sec ago`;
    } else if (secondsAgo < 3600) {
      const minAgo = Math.floor(secondsAgo / 60);
      return `${minAgo} min ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} hrs ago`;
    } else {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo} days ago`;
    }
  };

  return (
    <div ref={ref} className={`message ${isOwner && "owner"}`}>
      <div className="messageInfo">
        <img src={isOwner ? curUser.photoURL : data.user.photoURL} alt="" />
        <span>{calculateTimeStamp()}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}

export default Message;
