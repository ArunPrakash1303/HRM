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
  const [navContext, setNavContext] = useState(null);
  const [sidebarMini, setSidebarMini] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page, ctx = null) => {
    setCurrentPage(page);
    setNavContext(ctx);
    if (window.innerWidth < 900) {
      closeMobileSidebar();
    }
  };

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

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNav={handleNav} isDark={isDark} />;
      case 'employees': return <Employees onNav={handleNav} context={navContext} />;
      case 'documents': return <Documents onNav={handleNav} />;
      case 'recruitment': return <Recruitment onNav={handleNav} context={navContext} />;
      case 'interviews': return <Interviews onNav={handleNav} context={navContext} />;
      case 'liveinterview': return <LiveInterview onNav={handleNav} />;
      case 'livecoding': return <LiveCoding onNav={handleNav} />;
      case 'reports': return <Reports onNav={handleNav} isDark={isDark} />;
      case 'settings': return <Settings onNav={handleNav} isDark={isDark} setTheme={setTheme} />;
      default: return <Dashboard onNav={handleNav} isDark={isDark} />;
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
        onNav={handleNav} 
        onLogout={onLogout} 
        mini={sidebarMini}
        mobileOpen={mobileOpen}
        isDark={isDark}
      />

      <div className="main">
        <Header 
          onToggleSidebar={toggleSidebar} 
          toggleTheme={toggleTheme} 
          isDark={isDark} 
          onNav={handleNav}
        />
        
        <main className="content">
          <div className="page active fade-up">
            {renderPage()}
          </div>
        </main>
      </div>

      <BottomNav currentPage={currentPage} onNav={handleNav} />
    </div>
  );
}
