import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          sign out
        </button>
      </div>
    </div>
  );
}

export default Home;
