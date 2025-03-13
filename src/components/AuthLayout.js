import React from 'react';
import { Link } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout = ({ children, title, linkText, linkPath }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <div className="logo-container">
            <img src="/logo.png" alt="FILKOM PEDIA" className="logo" />
            <h1 className="logo-text">FILKOM PEDIA</h1>
          </div>
        </div>
        <div className="auth-right">
          <h2 className="auth-title">{title}</h2>
          {children}
          {linkText && (
            <div className="auth-link">
              {title === 'Login' ? "Don't have an account? " : "Already have an account? "}
              <Link to={linkPath}>{linkText}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;