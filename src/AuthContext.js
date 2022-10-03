import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [curUser, setCurUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurUser(user);
    });

    return () => {
      unsub();
    };
  });

  return (
    <AuthContext.Provider value={{ curUser }}>{children}</AuthContext.Provider>
  );
};
