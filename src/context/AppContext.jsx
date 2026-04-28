import React, { createContext, useState } from 'react';
import { DEMO_USERS } from '../data/demo';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (selectedRole) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
    // Get demo user data based on role
    const userData = DEMO_USERS[selectedRole];
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider value={{ user, role, isAuthenticated, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
