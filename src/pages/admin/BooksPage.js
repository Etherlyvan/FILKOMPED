// src/pages/admin/BooksPage.js
import React, { useState, useContext } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader'; // Import AdminHeader
import BookAddEditModal from '../../components/BookAddEditModal';
import BookDeleteConfirmModal from '../../components/BookDeleteConfirmModal';
import SuccessModal from '../../components/SuccessModal';
import { AuthContext } from '../../contexts/AuthContext';
import './BooksPage.css';

const BooksPage = () => {
  const { books, addBook, updateBook, deleteBook } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const filteredBooks = books.filter(book => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleAddBook = () => {
    setIsAddModalOpen(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  const handleDeleteBook = (book) => {
    setDeletingBook(book);
  };

  const handleSaveBook = (bookData, isNew) => {
    if (isNew) {
      addBook(bookData);
      setIsAddModalOpen(false);
      setSuccessMessage('Buku Baru Berhasil Ditambahkan!');
    } else {
      updateBook(bookData.id, bookData);
      setEditingBook(null);
      setSuccessMessage('Buku Berhasil Diperbarui!');
    }
    setShowSuccess(true);
  };

  const handleConfirmDelete = () => {
    deleteBook(deletingBook.id);
    setDeletingBook(null);
    setSuccessMessage('Buku Berhasil Dihapus!');
    setShowSuccess(true);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <div className="admin-content">
        {/* Use AdminHeader component instead of custom header */}
        <AdminHeader title="Data Buku" />
        
        <div className="search-filter-row">
          <div className="search-container">
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search anything here..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
         
        </div>
        
        <div className="books-list">
          {filteredBooks.map(book => (
            <div key={book.id} className="book-card">            
              <div className="book-content">
                <div className="book-image-container">
                  <img 
                    src="/assets/books/android-book.jpg" 
                    alt={book.title} 
                    className="book-image" 
                  />
                </div>
                <div className="book-details">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">Author: {book.author}</p>
                  <p className="book-year">{book.year}</p>
                  <p className="book-price">Rp {book.price.toLocaleString()}</p>
                  <p className="book-sales">SALES : {book.sales}</p>
                </div>
                
                <div className="book-actions2">
                  <button 
                    className="edit-button"
                    onClick={() => handleEditBook(book)}
                  >
                    EDIT
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteBook(book)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="add-book-container">
          <button 
            className="add-book-button"
            onClick={handleAddBook}
          >
            TAMBAH BUKU
          </button>
        </div>
      </div>
      
      {isAddModalOpen && (
        <BookAddEditModal
          isNew={true}
          onSave={handleSaveBook}
          onCancel={() => setIsAddModalOpen(false)}
        />
      )}
      
      {editingBook && (
        <BookAddEditModal
          isNew={false}
          book={editingBook}
          onSave={handleSaveBook}
          onCancel={() => setEditingBook(null)}
        />
      )}
      
      {deletingBook && (
        <BookDeleteConfirmModal
          book={deletingBook}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingBook(null)}
        />
      )}
      
      {showSuccess && (
        <SuccessModal
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default BooksPage;