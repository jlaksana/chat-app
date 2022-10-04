import React from "react";

function Search() {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
      </div>
      <div className="userChats">
        <img
          src="https://yt3.ggpht.com/yti/AJo0G0m2egONOVNB8hOHJjp8jrtrJY6cKd0ZB-HFi77Epg=s88-c-k-c0x00ffffff-no-rj-mo"
          alt=""
        />
        <div className="userChatInfo">
          <span>Jonathan</span>
        </div>
      </div>
    </div>
  );
}

export default Search;
