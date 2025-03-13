import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './BookCard.css';

/**
 * BookCard component - Displays a book with cover image and details
 * Optimized to match the provided design reference exactly
 */
const BookCard = ({ book, onViewDetails, onAddToCart }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(book.id);
    } else {
      navigate(`/book/${book.id}`);
    }
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(book.id);
    } else {
      alert(`Buku "${book.title}" ditambahkan ke keranjang!`);
    }
  };

  return (
    <div className="book-card">
      {/* Left column - Book cover image */}
      <div className="book-cover-column">
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`} 
          className="cover-image" 
          loading="lazy"
        />
      </div>
      
      {/* Right column - Book details */}
      <div className="book-details-column">
        <h3 className="book-title">{book.title}</h3>
        
        <div className="book-metadata">
          <p className="book-year">{book.year}</p>
          <p className="book-author">Author: {book.author}</p>
          <p className="book-price">Rp {book.price.toLocaleString()}</p>
        </div>
        
        <div className="book-actions">
          <button 
            className="detail-button"
            onClick={handleViewDetails}
            aria-label="View book details"
          >
            Lihat Detail
          </button>
          
          <button 
            className="cart-button"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    price: PropTypes.number.isRequired,
    coverImage: PropTypes.string.isRequired
  }).isRequired,
  onViewDetails: PropTypes.func,
  onAddToCart: PropTypes.func
};

export default BookCard;