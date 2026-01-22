import { createContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await api.post("users/login/", {
      username: email,   // ✅ REQUIRED BY DJANGO
      password,
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
