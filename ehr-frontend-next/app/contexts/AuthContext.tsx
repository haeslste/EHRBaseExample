'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, role: null });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({ token, role: decoded.role });
      } catch (e) {
        console.error('Invalid token');
        Cookies.remove('token');
        setAuth({ token: null, role: null });
      }
    }
  }, []);

  const login = (token, role) => {
    Cookies.set('token', token, { expires: 7 }); // persist for 7 days
    setAuth({ token, role });
  };

  const logout = () => {
    Cookies.remove('token');
    setAuth({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
