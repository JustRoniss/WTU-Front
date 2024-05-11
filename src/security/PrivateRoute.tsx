import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated =  localStorage.getItem('token') ? true : false;
  const location = useLocation(); 

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;