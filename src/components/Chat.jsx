import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import "../styles/Chat.css";
import Input from "./Input";
import Messages from "./Messages";

function Chat() {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jonathan</span>
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
