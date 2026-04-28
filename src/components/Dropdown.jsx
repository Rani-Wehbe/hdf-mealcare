import React, { useState, useRef, useEffect } from 'react';
import { animateSlideDown, animateSlideUp } from '../utils/animations';
import './Dropdown.css';

/**
 * Dropdown Component with smooth animations
 */
export function Dropdown({
  trigger,
  items,
  align = 'left',
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      animateSlideDown(contentRef.current, { duration: 250 });
    }
  }, [isOpen]);

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

  const handleToggle = async () => {
    if (isOpen && contentRef.current) {
      await animateSlideUp(contentRef.current, { duration: 250 });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown" ref={containerRef}>
      <button
        className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className={`dropdown-content ${align}`}
          ref={contentRef}
          style={{ height: 0, overflow: 'hidden' }}
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
        </div>
      )}
    </div>
  );
}
