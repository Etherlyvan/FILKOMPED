// src/pages/admin/TransactionsPage.js
import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

const TransactionsPage = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <div className="admin-content">
        <AdminHeader title="Transaksi" />
        
        <div className="placeholder-content">
          <h2>Halaman Transaksi</h2>
          <p>Fitur ini masih dalam pengembangan.</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;