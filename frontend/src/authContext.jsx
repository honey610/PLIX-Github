// src/authContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        setCurrentUser({ userId });
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('userId', userData.userId);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('userId');
  };

  const value = {
    currentUser,
    setCurrentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};