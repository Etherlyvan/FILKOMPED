import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './BookDetail.css';

// Mock data untuk detail buku (unchanged)
const BOOK_DETAIL = {
  id: 1,
  title: 'Androids : The Team that Built the Android Operating System',
  author: 'Haase, Chet',
  category: 'Computer Science',
  year: '2014',
  price: 100000,
  rating: 4,
  coverImage: '/assets/books/android-book.jpg',
  description: 'In 2004, Android was two people who wanted to build camera software but couldn\'t get investors interested. Today, Android is a large team at Google, delivering an operating system (including camera software) to over 3 billion devices worldwide. This is the inside story, told by the people who made it happen. This is a first-hand chronological account of how the start-up began, how the team came together, and how they all built an operating system from the kernel level to its applications and everything in between.',
  releaseDate: 'May, 2014'
};

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State variables for enhanced UX
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const goToReviews = () => {
    navigate(`/book/${id}/reviews`);
  };

  /**
   * Enhanced cart functionality with loading state and success feedback
   */
  const addToCart = () => {
    // Prevent multiple clicks
    if (isAddingToCart) return;
    
    // Set loading state
    setIsAddingToCart(true);
    
    // Simulate API call to add item to cart
    setTimeout(() => {
      // In a real app, this would be an API call:
      // await cartService.addItem(id, quantity);
      
      console.log(`Adding book ${id} to cart, quantity: ${quantity}`);
      
      // Show success state
      setIsAddingToCart(false);
      setAddedToCart(true);
      
      // Reset success state after animation completes
      setTimeout(() => {
        setAddedToCart(false);
      }, 1500);
    }, 800); // Simulated network delay
  };

  /**
   * Handle quantity change
   */
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="book-detail-page">
      <Header />
      
      <div className="book-detail-container">
        <div className="book-detail-left">
          <img 
            src={BOOK_DETAIL.coverImage} 
            alt={BOOK_DETAIL.title} 
            className="book-detail-image" 
            loading="lazy" // Performance optimization
          />
        </div>
        
        <div className="book-detail-right">
          <h1 className="book-detail-title">{BOOK_DETAIL.title}</h1>
          <div className="book-detail-price">Rp {BOOK_DETAIL.price.toLocaleString()}</div>
          
          <div className="book-detail-info">
            <div className="info-item">
              <span className="info-label">Author:</span> 
              <span className="info-value">{BOOK_DETAIL.author}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Category:</span> 
              <span className="info-value">{BOOK_DETAIL.category}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Description:</span> 
              <p className="info-description">{BOOK_DETAIL.description}</p>
            </div>
            <div className="info-item">
              <span className="info-label">Release date:</span> 
              <span className="info-value">{BOOK_DETAIL.releaseDate}</span>
            </div>
          </div>
          
          
          
          <div className="book-detail-actions">
            <button 
              onClick={goToReviews} 
              className="action-button review-button"
            >
              <img src="/assets/icons/eye-icon.svg" alt="" className="button-icon" aria-hidden="true" />
              Lihat Review
            </button>
            
            <button 
              onClick={addToCart} 
              className={`action-button2 cart-button2 ${isAddingToCart ? 'loading' : ''} ${addedToCart ? 'success' : ''}`}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <>
                  <span className="loading-spinner" aria-hidden="true"></span>
                  Menambahkan...
                </>
              ) : addedToCart ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="button-icon">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Ditambahkan!
                </>
              ) : (
                <>
                  <img src="/assets/icons/cart-icon.svg" alt="" className="button-icon" aria-hidden="true" />
                  Tambahkan ke keranjang
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;