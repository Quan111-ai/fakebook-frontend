import { useState, useEffect } from "react";

// Hook để lấy thông tin người dùng và token từ localStorage
export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));  // Lấy thông tin người dùng từ localStorage
      setToken(storedToken);           // Lấy token từ localStorage
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return { user, token, logout };
}
