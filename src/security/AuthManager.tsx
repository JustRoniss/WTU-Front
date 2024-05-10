import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthManager: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isTokenExpired = false; 
    if (token && !isTokenExpired) {
      navigate('/home');
    } else if (!token || isTokenExpired) {
      navigate('/login');
    }
  }, [navigate]);

  return null; 
};

export default AuthManager;
