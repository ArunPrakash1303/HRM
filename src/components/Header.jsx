import React from 'react';

export default function Header({ onToggleSidebar, toggleTheme, isDark, onNav }) {
  return (
    <header className="header">
      <button className="icon-btn" onClick={onToggleSidebar}>
        <span className="material-icons">menu</span>
      </button>
      
      <div className="search-bar desktop-hidden d-flex">
        <span className="material-icons" style={{ fontSize: '18px', color: 'var(--text-sec)' }}>search</span>
        <input 
          type="text" 
          placeholder="Search employees, candidates..." 
          style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', flex: 1, fontSize: '0.8rem' }}
        />
      </div>
      
      <div className="spacer"></div>
      
      <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
        <span className="material-icons" id="themeIcon">{isDark ? 'light_mode' : 'dark_mode'}</span>
      </button>
      
      <button className="icon-btn badge" title="Notifications">
        <span className="material-icons">notifications</span>
      </button>
      
      <div 
        className="header-avatar" 
        onClick={() => onNav('settings')} 
        title="Arun Prakash – HR Manager"
      >
        AP
      </div>
    </header>
  );
}
