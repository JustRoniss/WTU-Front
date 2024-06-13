import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import NotFound from './components/generics/NotFound';
import { AuthProvider } from './security/AuthProvider'; 
import ProtectedRoute from './security/ProtectedRoute'

// Admin imports
import PainelAdmin from './components/admin/PainelAdmin'
import CreateEvents from './components/admin/Event/CreateEvents';
import ViewEvents from './components/admin/Event/ViewEvents';
import CreateUnits from './components/admin/Unit/CreateUnits'
import ViewUnits from './components/admin/Unit/ViewUnits'


//User imports

import PainelUser from './components/user/PainelUser';
import UserEvents from './components/user/Event/UserEvents';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/not-found" element={<NotFound />} />
          
          <Route path="/admin/*" element={<ProtectedRoute roles={['ADMIN']} element={<PainelAdmin />} />}>
            <Route path="create-events" element={<CreateEvents />} />
            <Route path="view-events" element={<ViewEvents />} />
            <Route path="create-units" element={<CreateUnits />} />
            <Route path="view-units" element={<ViewUnits />} />
          </Route>

          <Route path="/user/*" element={<ProtectedRoute roles={['USER']} element={<PainelUser />} />}> 
            <Route path='view-events' element={<UserEvents/>}></Route>
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

