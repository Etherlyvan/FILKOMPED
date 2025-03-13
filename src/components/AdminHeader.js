// src/components/AdminHeader.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './AdminHeader.css';

const AdminHeader = ({ title }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="admin-header">
      <div className="header-title">
        <div className="header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
        </div>
        <h1>{title}</h1>
      </div>
      
      <div className="admin-profile">
        <div className="profile-image-container" onClick={toggleDropdown}>
          <img 
            src="/assets/users/user-avatar.png" 
            alt="Profile" 
            className="admin-avatar" 
          />
          {showDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-user-info">
                <p className="dropdown-username">{currentUser?.username || 'Admin'}</p>
                <p className="dropdown-email">{currentUser?.email || 'admin@example.com'}</p>
              </div>
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="dropdown-logout">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;