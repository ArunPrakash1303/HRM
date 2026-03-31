import React from 'react';

export default function BottomNav({ currentPage, onNav }) {
  const items = [
    { id: 'dashboard', icon: 'dashboard', label: 'Home' },
    { id: 'employees', icon: 'people', label: 'People' },
    { id: 'recruitment', icon: 'work', label: 'Recruit' },
    { id: 'interviews', icon: 'event_note', label: 'Schedule' },
    { id: 'reports', icon: 'bar_chart', label: 'Reports' },
  ];

  return (
    <nav className="bottom-nav" id="bottomNav">
      {items.map(item => (
        <div 
          key={item.id}
          className={`bottom-nav-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => onNav(item.id)}
        >
          <span className="material-icons">{item.icon}</span>
          <span className="bnl">{item.label}</span>
        </div>
      ))}
    </nav>
  );
}
