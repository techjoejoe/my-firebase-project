import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import LandingPage from './pages/LandingPage';
import GroupCode from './pages/GroupCode';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';  // Import Super Admin Dashboard page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />  {/* Default route to LandingPage */}
        <Route path="/login" element={<AdminLogin />} />  {/* Admin login route */}
        <Route path="/register" element={<AdminRegister />} />  {/* Admin registration route */}
        <Route path="/user-login" element={<UserLogin />} />  {/* User login route */}
        <Route path="/user-register" element={<UserRegister />} />  {/* User registration route */}
        <Route path="/group-code" element={<GroupCode />} />  {/* User GroupCode route */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />  {/* Admin Dashboard route */}
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />  {/* Super Admin Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
