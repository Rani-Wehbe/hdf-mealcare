import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideDownVariants } from '../utils/animations';
import './Dropdown.css';

/**
 * Dropdown Component with smooth animations using Framer Motion
 */
export function Dropdown({
  trigger,
  items,
  align = 'left',
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  const handleItemClick = (item) => {
    onSelect?.(item);
    setIsOpen(false);
  };

  return (
    <div className="dropdown" ref={containerRef}>
      <button
        className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`dropdown-content ${align}`}
            variants={slideDownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="dropdown-list">
              {items.map((item, idx) => (
                <button
                  key={idx}
                  className="dropdown-item"
                  onClick={() => handleItemClick(item)}
                >
                  {item.icon && <span className="dropdown-item-icon">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
