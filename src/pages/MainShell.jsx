import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Dashboard from './Dashboard';
import Employees from './Employees';
import Documents from './Documents';
import Recruitment from './Recruitment';
import Interviews from './Interviews';
import LiveInterview from './LiveInterview';
import LiveCoding from './LiveCoding';
import Reports from './Reports';
import Settings from './Settings';

export default function MainShell({ onLogout, isDark, toggleTheme, setTheme }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarMini, setSidebarMini] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < 900) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarMini(!sidebarMini);
    }
  };

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  const navTo = (page) => {
    setCurrentPage(page);
    if (window.innerWidth < 900) {
      closeMobileSidebar();
    }
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': return <Dashboard onNav={navTo} />;
      case 'employees': return <Employees onNav={navTo} />;
      case 'documents': return <Documents />;
      case 'recruitment': return <Recruitment />;
      case 'interviews': return <Interviews onNav={navTo} />;
      case 'liveinterview': return <LiveInterview />;
      case 'livecoding': return <LiveCoding />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings isDark={isDark} setTheme={setTheme} />;
      default: return <Dashboard onNav={navTo} />;
    }
  };

  return (
    <div className="app">
      <div 
        className={`overlay ${mobileOpen ? 'show' : ''}`} 
        onClick={closeMobileSidebar}
      ></div>

      <Sidebar 
        currentPage={currentPage}
        onNav={navTo} 
        onLogout={onLogout} 
        mini={sidebarMini} 
        mobileOpen={mobileOpen} 
      />

      <div className="main">
        <Header 
          onToggleSidebar={toggleSidebar} 
          toggleTheme={toggleTheme} 
          isDark={isDark} 
          onNav={navTo}
        />
        
        <main className="content">
          <div className="page active fade-up">
            {renderPage()}
          </div>
        </main>
      </div>

      <BottomNav currentPage={currentPage} onNav={navTo} />
    </div>
  );
}
