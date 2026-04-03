import React, { useState } from 'react';
import laptopImg from '../assets/Laptop.png';

export default function Login({ onLogin, isDark, toggleTheme }) {
  const [email, setEmail] = useState('m.arunprakashnkl@gmail.com');
  const [password, setPassword] = useState('Admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    setError('');
    setLoading(true);

    onLogin(email, password)
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="new-login-page">
      <div className="theme-toggle-login">
        <button className="btn btn-outline btn-sm d-flex align-items-center gap-2" onClick={toggleTheme}>
          <span className="material-icons" style={{ fontSize: '16px' }}>{isDark ? 'light_mode' : 'dark_mode'}</span>
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      <div className="new-login-card fade-in-up">
        {/* Left Section */}
        <div className="new-login-left">
          <div className="new-login-header">
            <div className="new-logo">
              {/* <div className="new-logo-icon"></div> */}
              {/* <span>System logo</span> */}
              <img
                src="src/assets/DMLogo.png"
                alt="HRM Logo"
                style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (document.getElementById('fallback-logo')) {
                    document.getElementById('fallback-logo').style.display = 'flex';
                  }
                }} />
                {/* <img src="src/assets/DMLogo.png" alt="Logo" className='img-fluid' width={"150"} /> */}
            </div>
          </div>

          <div className="new-login-body stagger-fade-in">
            <h1>Login</h1>
            <p className="subtitle">Login with HR Email ID</p>

            {error && <div className="alert alert-error show mb-3">{error}</div>}

            <form onSubmit={handleSubmit} className="new-login-form">
              <div className="input-with-icon">
                <span className="material-icons input-icon-left">person_outline</span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Designer"
                />
              </div>

              <div className="input-with-icon">
                <span className="material-icons input-icon-left">lock_outline</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <span
                  className="material-icons input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </div>

              <div className="new-form-actions">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-pwd">Forgot Password?</a>
              </div>

              <div className="new-button-group">
                <button type="submit" className="new-btn-login" disabled={loading}>
                  {loading ? (
                    <div className="loading-dots" style={{ margin: 0 }}><span></span><span></span><span></span></div>
                  ) : (
                    'Login'
                  )}
                </button>
                <button type="button" className="new-btn-signup">Sign up</button>
              </div>
            </form>

            <div className="demo-credentials-minimal">
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#a0a4bc' }}>Demo: </span>
              <span style={{ fontSize: '0.75rem', color: '#a0a4bc' }}>m.arunprakashnkl@gmail.com / Admin</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="new-login-right">
          <div className="shape-bg-lightest"></div>
          <div className="shape-bg-light"></div>
          <div className="shape-bg-dark"></div>
          <img src={laptopImg} alt="Laptop Illustration" className="laptop-img float-animation" />
        </div>
      </div>
    </div>
  );
}
