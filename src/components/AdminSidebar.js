// src/components/AdminSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="admin-logo">
        <img src="/assets/filkom-pedia-logo.png" alt="FILKOM PEDIA" />
      </div>
      
      <div className="sidebar-section">
        <p className="sidebar-label">Navigasi utama</p>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => 
            isActive ? "nav-item active" : "nav-item"
          }>
            <div className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"/>
              </svg>
            </div>
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/admin/members" className={({ isActive }) => 
            isActive ? "nav-item active" : "nav-item"
          }>
            <div className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <span>Data Anggota</span>
          </NavLink>
          
          <NavLink to="/admin/books" className={({ isActive }) => 
            isActive ? "nav-item active" : "nav-item"
          }>
            <div className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
              </svg>
            </div>
            <span>Data Buku</span>
          </NavLink>
          
          <NavLink to="/admin/transactions" className={({ isActive }) => 
            isActive ? "nav-item active" : "nav-item"
          }>
            <div className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span>Transaksi</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;