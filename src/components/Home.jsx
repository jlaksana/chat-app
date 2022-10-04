import "../styles/Home.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
