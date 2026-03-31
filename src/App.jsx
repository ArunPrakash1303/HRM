import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import MainShell from './pages/MainShell';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('auth') === 'true');
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    // 1.5s attractive simulation loader for HR application
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleLogin = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'm.arunprakashnkl@gmail.com' && password === 'Admin') {
          setIsAuthenticated(true);
          localStorage.setItem('auth', 'true');
          resolve(true);
        } else {
          reject(new Error('Invalid credentials. Please try again.'));
        }
      }, 1200);
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`theme-${isDark ? 'dark' : 'light'}`}>
      {isAppLoading ? (
        <div className="hr-loader-overlay">
          <div className="hr-loader-container">
            <div className="hr-node ceo"></div>
            <div className="hr-node manager-1"></div>
            <div className="hr-node manager-2"></div>
            <div className="hr-line hr-line-1"></div>
            <div className="hr-line hr-line-2"></div>
          </div>
          <div className="hr-loader-text">PeopleOS</div>
        </div>
      ) : (
        isAuthenticated ? (
          <MainShell onLogout={handleLogout} isDark={isDark} toggleTheme={toggleTheme} setTheme={(val) => setIsDark(val)} />
        ) : (
          <Login onLogin={handleLogin} isDark={isDark} toggleTheme={toggleTheme} />
        )
      )}
    </div>
  );
}

export default App;
