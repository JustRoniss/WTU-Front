import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import NotFound from './components/NotFound';
import PrivateRoute from './security/PrivateRoute';
import AuthManager from './security/AuthManager'; // Importe o novo componente

const App: React.FC = () => {
  return (
    <Router>
      <AuthManager /> {/* Colocado logo dentro do Router para gerenciar a autenticação */}
      <Routes>
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
