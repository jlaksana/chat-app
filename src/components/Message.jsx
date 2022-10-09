import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { ChatContext } from "../ChatContext";

function Message({ message }) {
  const { curUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div className="message">
      <div className="messageInfo">
        <img
          src="https://yt3.ggpht.com/yti/AJo0G0m2egONOVNB8hOHJjp8jrtrJY6cKd0ZB-HFi77Epg=s88-c-k-c0x00ffffff-no-rj-mo"
          alt=""
        />
        <span>time</span>
      </div>
      <div className="messageContent">
        <p>message content</p>
        {/* <img
          src=
          alt=""
        /> */}
      </div>
    </div>
  );
}

export default Message;
