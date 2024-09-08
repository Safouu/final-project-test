import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    const storedIsUser = localStorage.getItem('isUser') === 'true';
    const storedUserId = localStorage.getItem('userId');
    const storedFirstName = localStorage.getItem('firstName');
    const storedToken = localStorage.getItem('userToken');

    setIsLoggedIn(storedIsLoggedIn);
    setIsAdmin(storedIsAdmin);
    setIsUser(storedIsUser);
    setUserId(storedUserId);
    setFirstName(storedFirstName);
    setToken(storedToken);
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setIsAdmin(userData.isAdmin);
    setIsUser(userData.isUser);
    setUserId(userData.userId);
    setFirstName(userData.firstName);
    setToken(userData.token); 

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', userData.isAdmin);
    localStorage.setItem('isUser', userData.isUser);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('firstName', userData.firstName);
    localStorage.setItem('userToken', userData.token); 
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsUser(false);
    setUserId(null);
    setFirstName('');
    setToken('');

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isUser');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('userToken'); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, isUser, userId, firstName, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
