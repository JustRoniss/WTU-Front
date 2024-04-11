import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'



export default function App() {
  return(
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/create-account" element={<CreateAcc/>} /> */}
      </Routes>
    </Router>
  ) 
}
