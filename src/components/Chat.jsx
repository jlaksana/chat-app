import React, { useContext } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
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
        <div className="chatIcons">
          <IoMdAdd />
          <FiMoreVertical />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
