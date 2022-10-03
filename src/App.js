import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const { curUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!curUser) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
