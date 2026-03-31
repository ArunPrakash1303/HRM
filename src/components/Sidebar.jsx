import React from 'react';

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

export default function Sidebar({ currentPage, onNav, onLogout, mini, mobileOpen }) {
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
      <div className="sidebar-logo">
        <div className="logo-icon">P</div>
        <div className="logo-text">
          <h2 className="mb-0">PeopleOS</h2>
          <p className="mb-0 text-muted" style={{ fontSize: '0.68rem' }}>HR Management</p>
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
