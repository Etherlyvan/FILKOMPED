import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const success = register(username, email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Email already in use');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <div className="logo-container">
            <img src="/assets/filkom-pedia-logo.png" alt="FILKOM PEDIA" className="logo" />
          </div>
        </div>
        
        <div className="auth-right">
          <h2 className="auth-title">Register</h2>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <div className="input-with-icon">
                <div className="input-icon">
                  <img src="/assets/icons/user-icon.svg" alt="User" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="supermarco@gmail.com"
                  required
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <div className="input-icon">
                  <img src="/assets/icons/email-icon.svg" alt="Email" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="supermarco@gmail.com"
                  required
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <div className="input-icon">
                  <img src="/assets/icons/password-icon.svg" alt="Password" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img 
                    src={`/assets/icons/${showPassword ? 'eye-open.svg' : 'eye-closed.svg'}`} 
                    alt="Toggle password" 
                  />
                </button>
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="confirmPassword">Retype Password</label>
              <div className="input-with-icon">
                <div className="input-icon">
                  <img src="/assets/icons/password-icon.svg" alt="Password" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img 
                    src={`/assets/icons/${showConfirmPassword ? 'eye-open.svg' : 'eye-closed.svg'}`}
                    alt="Toggle password" 
                  />
                </button>
              </div>
            </div>
            
            <button type="submit" className="auth-button">REGISTER</button>
            
            <div className="auth-link">
              Already have an account? <Link to="/login">Log in here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;