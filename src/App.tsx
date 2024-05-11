import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import Painel from './components/admin/Painel'
import NotFound from './components/NotFound';
import { AuthProvider } from './security/AuthProvider'; 
import ProtectedRoute from './security/ProtectedRoute'


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/admin" element={<ProtectedRoute roles={['ADMIN']} element={<Painel />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

