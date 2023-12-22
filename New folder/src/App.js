import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import AboutUsPage from './pages/AboutUsPage';
import NewRequest from './pages/NewRequest';
import MyRequest from './pages/MyRequest';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/MyProfile';
import EditProfile from './pages/EditProfile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminManageRequest from './pages/Admin/AdminManageRequest';
import AdminManageUsers from './pages/Admin/AdminManageUsers';
import AdminManageFacilities from './pages/Admin/AdminManageFacilities';
import AdminCreateUser from './pages/Admin/AdminCreateUser';
import AdminMyProfile from './pages/Admin/AdminMyProfile';
import AdminManageStaff from './pages/Admin/AdminManageStaff';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/new-request" element={<NewRequest />} />
          <Route path="/my-request" element={<MyRequest />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/my-profile" element={<AdminMyProfile />} />
          <Route path="/manage-request" element={<AdminManageRequest />} />
          <Route path="/manage-users" element={<AdminManageUsers />} />
          <Route path="/manage-facilities" element={<AdminManageFacilities />} />
          <Route path="/manage-users/create-user" element={<AdminCreateUser />} />
          <Route path="/manage-staff" element={<AdminManageStaff />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
