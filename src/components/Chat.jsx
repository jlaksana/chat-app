import React, { useContext } from "react";
import { ChatContext } from "../ChatContext";
import "../styles/Chat.css";
import Input from "./Input";
import Messages from "./Messages";

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
