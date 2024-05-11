import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  roles?: string[];
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, element }) => {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated()) {
    // Usamos o state para preservar a localização para a qual o usuário tentava acessar
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verifica se precisa de alguma role específica
  if (roles && !roles.some(hasRole)) {
    // Se não tiver a role necessária, redireciona para uma tela de acesso negado
    return <Navigate to="/not-found" replace />;
  }

  // Renderiza a rota protegida
  return element;
};

export default ProtectedRoute;
