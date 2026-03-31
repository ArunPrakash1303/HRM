import React, { useState } from 'react';
import logoLight from '../assets/HRMLogo.png';
import logoDark from '../assets/DMLogo.png';

export default function Login({ onLogin, isDark, toggleTheme }) {
  const [email, setEmail] = useState('m.arunprakashnkl@gmail.com');
  const [password, setPassword] = useState('Admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div className="login-page text-center" style={{ display: 'flex', width: '100%', height: '100vh', background: 'var(--bg)' }}>
      <div className="theme-toggle-login" style={{ position: 'fixed', top: '16px', right: '16px' }}>
        <button className="btn btn-outline btn-sm d-flex align-items-center gap-2" onClick={toggleTheme}>
          <span className="material-icons" style={{ fontSize: '16px' }}>{isDark ? 'light_mode' : 'dark_mode'}</span>
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      <div className="login-card mx-auto text-start">
        <div className="login-logo mb-4 d-flex align-items-center gap-3">
          <img 
            src={isDark ? logoDark : logoLight} 
            alt="HRM Logo" 
            style={{ height: '48px', width: 'auto', objectFit: 'contain' }} 
            onError={(e) => {
              e.target.style.display = 'none';
              if (document.getElementById('fallback-logo-login')) {
                document.getElementById('fallback-logo-login').style.display = 'flex';
              }
            }} 
          />
          {/* Fallback styling that EXACTLY matches the text colors and layout of the provided logo if the image isn't loaded */}
          <div id="fallback-logo-login" style={{ display: 'none', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', fontWeight: 900, fontSize: '38px', letterSpacing: '-0.5px', lineHeight: 1 }}>
              <span style={{ color: isDark ? '#FFFFFF' : '#003B71' }}>HR</span>
              <span style={{ color: isDark ? '#FFFFFF' : '#FFC107' }}>M</span>
            </div>
            <div style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px', marginTop: '2px' }}>
              HR MANAGEMENT
            </div>
          </div>
        </div>
        
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '4px' }}>Welcome back</h1>
        <p style={{ color: 'var(--text-sec)', fontSize: '0.85rem', marginBottom: '24px' }}>Sign in to your HR dashboard</p>
        
        {error && <div className="alert alert-error show mb-3">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Email address</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Enter email" 
              style={{ borderRadius: '10px' }}
            />
          </div>
          
          <div className="form-group mb-3">
            <label className="form-label mb-1" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Password</label>
            <div className="input-wrap">
              <input 
                type="password" 
                className="form-control" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Enter password" 
                style={{ borderRadius: '10px' }}
              />
            </div>
          </div>
          
          <div className="form-row d-flex justify-content-between align-items-center mb-4">
            <label className="d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <a href="#" style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none' }}>Forgot password?</a>
          </div>
          
          <button type="submit" className="btn btn-primary w-100 d-flex justify-content-center py-2" style={{ borderRadius: '10px' }} disabled={loading}>
            {loading ? (
              <div className="loading-dots"><span></span><span></span><span></span></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="demo-box mt-4 p-3 rounded" style={{ background: 'var(--primary-subtle)', border: '1px solid var(--primary-subtle)' }}>
          <div className="demo-title fw-bold mb-2" style={{ fontSize: '0.78rem' }}>Demo Credentials</div>
          <p className="mb-1" style={{ fontSize: '0.72rem', color: 'var(--text-sec)' }}>Email: m.arunprakashnkl@gmail.com</p>
          <p className="mb-0" style={{ fontSize: '0.72rem', color: 'var(--text-sec)' }}>Password: Admin</p>
        </div>
      </div>
    </div>
  );
}
