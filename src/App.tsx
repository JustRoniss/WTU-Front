import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import PrivateRoute from './security/PrivateRoute'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/" element={
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  ); 
}

export default App;