import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ username: "admin" });
  }, []);

  const login = (username, password) => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("token", "fake-token");
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// Este archivo solo exporta el provider. El contexto viene de AuthContext.js
