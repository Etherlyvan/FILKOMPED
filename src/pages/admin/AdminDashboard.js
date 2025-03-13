// src/pages/admin/AdminDashboard.js
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { members } = useContext(AuthContext);

  // Mock data for statistics
  const booksCount = 17956;
  const usersCount = 7849;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <div className="admin-content">
        <AdminHeader title="Dashboard" />
        <div className="dashboard-container">
          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-info">
                <h3>User</h3>
                <p className="stat-number">{usersCount.toLocaleString()}</p>
              </div>
              <div className="stat-icon user-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12.75c1.63 0 3.07-.81 3.94-2.06 1.44-2.08 1.44-4.83 0-6.91C14.84 2.54 13.46 1.75 12 1.75s-2.84.79-3.94 2.03c-1.44 2.08-1.44 4.83 0 6.91.87 1.25 2.31 2.06 3.94 2.06zm0-8c.55 0 1.05.23 1.4.65.85 1.23.85 2.86 0 4.09-.35.42-.85.65-1.4.65s-1.05-.23-1.4-.65c-.85-1.23-.85-2.86 0-4.09.35-.42.85-.65 1.4-.65z"/>
                  <path d="M12 14c-5.01 0-9.09 3.36-9.09 7.5 0 .4.33.73.73.73h16.73c.4 0 .73-.33.73-.73 0-4.14-4.08-7.5-9.09-7.5zm0 1.5c3.55 0 6.48 2.15 6.88 5.25H5.12c.4-3.1 3.33-5.25 6.88-5.25z"/>
                </svg>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-info">
                <h3>Buku</h3>
                <p className="stat-number">{booksCount.toLocaleString()}</p>
              </div>
              <div className="stat-icon book-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h13v16z"/>
                  <path d="M9 8h7v2H9zm0 4h7v2H9zm0 4h5v2H9z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Widgets */}
          <div className="dashboard-widgets">
            {/* Members List Widget */}
            <div className="widget members-list">
              <div className="widget-header">
                <div className="widget-title">
                  <h3>Daftar</h3>
                  <span className="widget-subtitle">Anggota</span>
                </div>
                <div className="widget-actions">
                  <span className="badge">Hari senin</span>
                </div>
              </div>
              
              <div className="widget-content">
                <table className="members-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>Tanggal Bergabung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.slice(0, 5).map(member => (
                      <tr key={member.id}>
                        <td>{member.id}</td>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                        <td>{member.joinDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="widget-pagination">
                  <div className="pagination-bar">
                    <div className="pagination-progress"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chart Widget */}
            <div className="widget chart-widget">
              <div className="widget-header">
                <div className="widget-title">
                  <h3>GRAFIK</h3>
                  <span className="widget-subtitle">Penjualan Buku</span>
                </div>
              </div>
              
              <div className="widget-content">
                <div className="chart-container">
                  <div className="chart-bars">
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '40%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                    <div className="chart-bar" style={{ height: '50%' }}></div>
                    <div className="chart-bar" style={{ height: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;