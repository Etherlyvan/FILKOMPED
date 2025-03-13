import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await login(email, password);
      
      // Pengarahan berdasarkan peran pengguna
      if (result.success) {
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Email atau password salah');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat login');
    }
  };

  return (
    // Kode JSX yang sudah ada
    <div className="auth-container">
      {/* Konten form login yang sudah ada */}
      <div className="auth-card">
        <div className="auth-left">
          <div className="logo-container">
            <img src="/assets/filkom-pedia-logo.png" alt="FILKOM PEDIA" className="logo" />
          </div>
        </div>
        
        <div className="auth-right">
          <h2 className="auth-title">Login</h2>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <div className="input-icon">✉️</div>
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
                <div className="input-icon">🔒</div>
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
                  👁️
                </button>
              </div>
            </div>
            
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            
            <button type="submit" className="auth-button">Log in</button>
            
            <div className="auth-link">
              Don't have an account? <Link to="/register">Sign up here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;