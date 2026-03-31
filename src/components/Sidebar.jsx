import React from 'react';
import logoLight from '../assets/HRMLogo.png';
import logoDark from '../assets/DMLogo.png';

const NavItem = ({ icon, label, id, onClick, activeId, mini }) => {
  const active = activeId === id;
  return (
    <div 
      className={`nav-item ${active ? 'active' : ''}`} 
      onClick={() => onClick(id)}
    >
      <span className="material-icons">{icon}</span>
      <span className="nav-label">{label}</span>
    </div>
  );
};

export default function Sidebar({ currentPage, onNav, onLogout, mini, mobileOpen, isDark }) {
  let cls = 'sidebar';
  if (mini) cls += ' mini';
  if (mobileOpen) cls += ' mobile-open';

  const navs = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'employees', icon: 'people', label: 'Employees' },
    { id: 'documents', icon: 'description', label: 'Documents' },
    { id: 'recruitment', icon: 'work', label: 'Recruitment' },
    { id: 'interviews', icon: 'event_note', label: 'Interviews' },
    { id: 'liveinterview', icon: 'videocam', label: 'Live Interview' },
    { id: 'livecoding', icon: 'code', label: 'Live Coding' },
    { id: 'reports', icon: 'bar_chart', label: 'Reports' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className={cls} id="sidebar">
      <div className="sidebar-logo" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', minHeight: '80px' }}>
        <img 
          src={isDark ? logoDark : logoLight} 
          alt="HRM Logo" 
          style={{ height: '42px', width: 'auto', objectFit: 'contain' }} 
          onError={(e) => {
            e.target.style.display = 'none';
            if (document.getElementById('fallback-logo')) {
              document.getElementById('fallback-logo').style.display = 'flex';
            }
          }} 
        />
        {/* Fallback styling that EXACTLY matches the text colors and layout of the provided logo if the image isn't loaded */}
        <div id="fallback-logo" style={{ display: 'none', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', fontWeight: 900, fontSize: '32px', letterSpacing: '-0.5px', lineHeight: 1 }}>
            <span style={{ color: isDark ? '#FFFFFF' : '#003B71' }}>HR</span>
            <span style={{ color: isDark ? '#FFFFFF' : '#FFC107' }}>M</span>
          </div>
          <div style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.5px', marginTop: '2px' }}>
            HR MANAGEMENT
          </div>
        </div>
      </div>
      <nav className="nav-list">
        {navs.map(n => (
          <NavItem 
            key={n.id} 
            {...n} 
            activeId={currentPage} 
            onClick={onNav}
            mini={mini}
          />
        ))}
      </nav>
      <div className="sidebar-user">
        <div className="user-avatar">AP</div>
        <div className="user-info">
          <h4 className="mb-0">Arun Prakash</h4>
          <p className="mb-0">HR Manager</p>
        </div>
        <button className="icon-btn" onClick={onLogout} title="Logout">
          <span className="material-icons" style={{ fontSize: '18px' }}>logout</span>
        </button>
      </div>
    </aside>
  );
}
