// src/components/BookAddEditModal.js
import React, { useState } from 'react';
import './BookAddEditModal.css';

const BookAddEditModal = ({ isNew, book, onSave, onCancel }) => {
  const initialState = isNew 
    ? {
        title: '',
        author: '',
        year: '',
        description: '',
        price: '',
        stock: '',
        coverImage: null,
        sales: 0
      }
    : {
        ...book,
        price: book.price.toString(),
        stock: book.stock.toString()
      };
  
  const [formData, setFormData] = useState(initialState);
  const [coverPreview, setCoverPreview] = useState(isNew ? null : book?.coverImage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
        setFormData(prev => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const bookData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      id: isNew ? `book-${Date.now()}` : book.id,
      coverImage: formData.coverImage || '/assets/books/default-book.jpg'
    };
    
    onSave(bookData, isNew);
  };

  return (
    <div className="modal-overlay">
      <div className="book-modal">
        <div className="modal-content">
          <div className="book-form-container">
            <div className="form-layout">
              <div className="cover-upload-section">
                <div className="cover-preview" style={{ backgroundColor: '#e0e0e0' }}>
                  {coverPreview ? (
                    <img src={coverPreview} alt="Book Cover" className="cover-image" />
                  ) : (
                    <div className="upload-placeholder">Upload Sampul Buku</div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="coverImage"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="coverImage" className="upload-button">UPLOAD</label>
              </div>
              
              <div className="book-details-section">
                <div className="form-group">
                  <label htmlFor="title">Masukkan Judul Buku</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Judul Buku"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="author">Masukkan Nama Penulis</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Nama Penulis"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="year">Masukkan Tahun Rilis</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2023"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Masukkan Deskripsi Singkat</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Deskripsi buku..."
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="price">Set Harga</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="100000"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="stock">Masukkan Stok Buku</label>
                  <input
                    type="text"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="20"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={handleSubmit} className="save-button">SIMPAN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAddEditModal;