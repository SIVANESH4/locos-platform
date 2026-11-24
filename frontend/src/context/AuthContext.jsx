
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check whether a user is already authenticated.
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!accessToken && !refreshToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me/");
        setUser(response.data);
      } catch (error) {
        setUser(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for accessing authentication.
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
