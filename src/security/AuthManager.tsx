import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  exp: number;
  role: string;
}

const AuthManager: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const isTokenExpired = (token: string): boolean => {
      if (!token) return true;
      const { exp } = jwtDecode<DecodedToken>(token);
      return Date.now() >= exp * 1000;
    };

    const getUserRole = (token: string): string => {
      const { role } = jwtDecode<DecodedToken>(token);
      return role;
    };

    (async () => {
      if (token && !isTokenExpired(token)) {
        const userRole = getUserRole(token);

        if (userRole === 'admin') {
          navigate('/admin');
        } else if (userRole === 'user') {
          navigate('/home');
        } else {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    })();
  }, [navigate]);

  return null;
};

export default AuthManager;