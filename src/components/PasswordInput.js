import React, { useState } from 'react';
import './PasswordInput.css';

const PasswordInput = ({ id, label, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <div className="password-input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder || '********'}
          required
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          <i className={`eye-icon ${showPassword ? 'visible' : ''}`}>
            👁️
          </i>
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;