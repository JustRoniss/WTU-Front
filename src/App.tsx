import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/user/Home';
import Painel from './components/admin/Painel'
import NotFound from './components/generics/NotFound';
import { AuthProvider } from './security/AuthProvider'; 
import ProtectedRoute from './security/ProtectedRoute'
import CreateEvents from './components/admin/Event/CreateEvents';
import ViewEvents from './components/admin/Event/ViewEvents';
import CreateUnits from './components/admin/Unit/CreateUnits'
import ViewUnits from './components/admin/Unit/ViewUnits'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/admin/*" element={<ProtectedRoute roles={['ADMIN']} element={<Painel />} />}>
            <Route path="create-events" element={<CreateEvents />} />
            <Route path="view-events" element={<ViewEvents />} />
            <Route path="create-units" element={<CreateUnits />} />
            <Route path="view-units" element={<ViewUnits />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

