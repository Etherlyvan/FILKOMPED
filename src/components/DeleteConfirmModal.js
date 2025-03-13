// src/components/DeleteConfirmModal.js
import React from 'react';
import './DeleteConfirmModal.css';

const DeleteConfirmModal = ({ member, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <div className="delete-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        
        <div className="delete-message">
          <h3>Yakin ingin menghapus user</h3>
          <p>"{member.name}"</p>
          <h3>dari Database?</h3>
        </div>
        
        <div className="delete-actions">
          <button onClick={onConfirm} className="confirm-button">YA</button>
          <button onClick={onCancel} className="cancel-button">TIDAK</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;