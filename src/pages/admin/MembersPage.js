// src/pages/admin/MembersPage.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import MemberEditModal from '../../components/MemberEditModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import './MembersPage.css';

const MembersPage = () => {
  const { members, updateMember, deleteMember } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);
  
  const filteredMembers = members.filter(member => {
    return (
      member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleSaveEdit = (updatedMember) => {
    updateMember(updatedMember.id, updatedMember);
    setEditingMember(null);
  };

  const handleDelete = (member) => {
    setDeletingMember(member);
  };

  const confirmDelete = () => {
    if (deletingMember) {
      deleteMember(deletingMember.id);
      setDeletingMember(null);
    }
  };

  const cancelDelete = () => {
    setDeletingMember(null);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <div className="admin-content">
        <AdminHeader title="Data Anggota" />
        
        <div className="members-container">
          <div className="members-header">
            <div className="search-container">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search anything here..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="filter-container">
              <button className="filter-button">
                Filter
                <svg className="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="members-table-container">
            <table className="members-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>GMAIL ADDRESS</th>
                  <th>JOIN DATE</th>
                  <th>SALES NUMBER</th>
                  <th colSpan="2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(member => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.joinDate}</td>
                    <td>{member.salesNumber}</td>
                    <td>
                      <button 
                        className="edit-button"
                        onClick={() => handleEdit(member)}
                      >
                        EDIT
                      </button>
                    </td>
                    <td>
                      <button 
                        className="delete-button"
                        onClick={() => handleDelete(member)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {editingMember && (
        <MemberEditModal
          member={editingMember}
          onSave={handleSaveEdit}
          onCancel={() => setEditingMember(null)}
        />
      )}
      
      {deletingMember && (
        <DeleteConfirmModal
          member={deletingMember}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default MembersPage;