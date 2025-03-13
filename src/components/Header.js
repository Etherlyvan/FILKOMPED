import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Header.css';

/**
 * Header component for e-commerce platform
 * Implements modern search with filter functionality and user profile
 * 
 * @returns {JSX.Element} - Rendered component
 */
const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles search form submission
   * @param {Event} e - Form submission event
   */
  const handleSearch = (e) => {
    e.preventDefault();
    // In production, this would navigate to search results page with query
    console.log('Searching for:', searchQuery);
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  /**
   * Toggles user profile dropdown visibility
   */
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  /**
   * Handles user logout
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /**
   * Handles filter button click
   */
  const handleFilterClick = () => {
    // In production, this would open a filter modal or navigate to advanced search
    console.log('Opening filters');
  };

  /**
   * Handles cart button click
   */
  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo-container">
          <img 
            src="/assets/logos/android-logo.png" 
            alt="FP Logo" 
            className="logo-image"
          />
        </Link>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <button type="submit" className="search-button" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
            <input 
              type="text" 
              placeholder="Cari Buku" 
              className="search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for books"
            />
          </div>
          
          {/* Filter Button */}
          <button 
            type="button" 
            className="filter-button" 
            onClick={handleFilterClick}
            aria-label="Filter search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
            </svg>
            
          </button>
          {/* Cart Button */}
          <button 
            className="cart-button" 
            onClick={handleCartClick}
            aria-label="Shopping cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
          
        </form>
        
        {/* Action Buttons */}
        <div className="header-actions">
          
          
          {/* User Profile */}
          <div className="user-profile">
            <div 
              className="profile-image-container" 
              onClick={toggleDropdown}
              role="button"
              tabIndex="0"
              aria-expanded={showDropdown}
              aria-haspopup="true"
            >
              <img 
                src={currentUser?.photoURL || "/assets/users/user-avatar.png"} 
                alt="User profile" 
                className="profile-image" 
              />
            </div>
            
            {/* User Dropdown Menu */}
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-user-info">
                  <p className="dropdown-username">{currentUser?.username || 'User'}</p>
                  <p className="dropdown-email">{currentUser?.email || 'user@example.com'}</p>
                  <p className="dropdown-role">
                    {currentUser?.role === 'admin' ? 'Administrator' : 'User'}
                  </p>
                </div>
                <div className="dropdown-divider"></div>
                {currentUser?.role === 'admin' && (
                  <Link to="/admin" className="dropdown-item">
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="dropdown-logout">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Horizontal divider */}
      <div className="header-divider"></div>
    </header>
  );
};

export default Header;