import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import Painel from './components/admin/Painel'
import NotFound from './components/NotFound';
import PrivateRoute from './security/PrivateRoute';
import AuthManager from './security/AuthManager'; 

const App: React.FC = () => {
  return (
    <Router>
      <AuthManager />
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

        <Route path="/admin" element= {
          <PrivateRoute>
            <Painel />
          </PrivateRoute>
        } />

        
      </Routes>
    </Router>
  );
}

export default App;
