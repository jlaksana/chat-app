import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../AuthContext";
import { ChatContext } from "../ChatContext";
import { db, storage } from "../firebase";

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { curUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatID), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderID: curUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID: curUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    // update latest message for both users
    await updateDoc(doc(db, "userChats", curUser.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type a message..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKey}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <BiImageAdd />
        </label>
        <div className="submit" onClick={handleSend}>
          <IoMdSend />
        </div>
      </div>
    </div>
  );
}

export default Input;
