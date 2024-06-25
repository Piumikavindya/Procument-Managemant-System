import React, { createContext, useContext, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSignIn = (user) => {
    console.log("User details:", user);
    setIsAuthenticated(true);
    console.log("User authenticated state:", isAuthenticated);
    setLoggedInUser(user);
    navigate("/loginpage");
  };

  const handleSignOut = () => {
    console.log("Signing out...");
    setIsAuthenticated(false);
    setLoggedInUser(null);
    console.log("User authenticated state:", isAuthenticated);
    console.log("Logged-in user:", loggedInUser);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loggedInUser, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};