'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { userInfo } from 'os';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, role: null, userId: Number });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({ token, role: decoded.role, userId: decoded.userId });
      } catch (e) {
        console.error('Invalid token');
        Cookies.remove('token');
        setAuth({ token: null, role: null, userId: null });
      }
    }
  }, []);

  const login = (token, role, userId) => {
    Cookies.set('token', token, { expires: 7 }); // persist for 7 days
    setAuth({ token, role, userId: userId });
  };

  const logout = () => {
    Cookies.remove('token');
    setAuth({ token: null, role: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
