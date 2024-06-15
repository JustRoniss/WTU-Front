import React, { createContext, useContext, useState, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';


interface AuthToken {
  exp: number;
  roles: string;
  sub: string;
}

interface AuthContextType {
  token: string | null;
  signIn: (newToken: string) => void;
  signOut: () => void;
  isAuthenticated: () => boolean;
  hasRole: (role: string) => boolean;
  getRoleFromToken: (token: string) => string | null;
  getEmailFromToken: () => string | null; 
}


const AuthContext = createContext<AuthContextType>(null!);

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const signIn = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    // Redireciona para login?
  };

  const isAuthenticated = () => {
    if (!token) return false;
    const decoded: AuthToken = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  };

  const hasRole = (role: string): boolean => {
    if (!token) return false;
    try {
      const decoded: AuthToken = jwtDecode<AuthToken>(token);
      return decoded.roles === role;
    } catch (error) {
      console.error('Failed to decode JWT', error);
      return false;
    }
  };

  const getRoleFromToken = (token: string): string | null => {
    try{
      const decoded: AuthToken = jwtDecode(token);
      return decoded.roles
    }catch(error){
      console.error("Error to decode token: ", error)
      return null;
    }
  };

  const getEmailFromToken = (): string | null => {
    if(!token) return null;
    try{
      const decoded: AuthToken = jwtDecode(token);
      return decoded.sub;
    }catch(error){
        console.error('Failed to decode token: ', error)
        return null;
    }
  }
 
  return (
    <AuthContext.Provider value={{ token, signIn, signOut, isAuthenticated, hasRole, getRoleFromToken, getEmailFromToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
