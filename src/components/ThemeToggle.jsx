import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

/**
 * Theme Toggle Button - Light/Dark Mode Switch
 */
export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle dark mode"
    >
      <span className="theme-icon">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
