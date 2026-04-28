import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './styles/index.css';

function AppContent() {
  const { isAuthenticated } = useApp();

  return isAuthenticated ? <Dashboard /> : <Login />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
