import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";

function Input() {
  return (
    <div className="input">
      <input type="text" placeholder="Type a message..." />
      <div className="send">
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <BiImageAdd />
        </label>
        <div className="submit">
          <IoMdSend />
        </div>
      </div>
    </div>
  );
}

export default Input;
