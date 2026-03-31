import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import MainShell from './pages/MainShell';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleLogin = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'm.arunprakashnkl@gmail.com' && password === 'Admin') {
          setIsAuthenticated(true);
          resolve(true);
        } else {
          reject(new Error('Invalid credentials. Please try again.'));
        }
      }, 1200);
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} isDark={isDark} toggleTheme={toggleTheme} />;
  }

  return <MainShell onLogout={handleLogout} isDark={isDark} toggleTheme={toggleTheme} setTheme={(val) => setIsDark(val)} />;
}

export default App;
