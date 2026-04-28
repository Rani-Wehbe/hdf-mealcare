import React, { useState, useRef } from 'react';
import { animateSlideDown, animateSlideUp } from '../utils/animations';
import './Accordion.css';

/**
 * Accordion Component with smooth animations
 */
export function Accordion({ items }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleItem = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="accordion">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isExpanded={expandedId === item.id}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}

/**
 * Individual Accordion Item with animations
 */
function AccordionItem({ item, isExpanded, onToggle }) {
  const contentRef = useRef(null);

  React.useEffect(() => {
    if (!contentRef.current) return;

    if (isExpanded) {
      animateSlideDown(contentRef.current, { duration: 300 });
    } else {
      animateSlideUp(contentRef.current, { duration: 300 });
    }
  }, [isExpanded]);

  return (
    <div className={`accordion-item ${isExpanded ? 'expanded' : ''}`}>
      <button className="accordion-header" onClick={onToggle}>
        <div className="accordion-title">
          {item.icon && <span className="accordion-icon">{item.icon}</span>}
          <span>{item.title}</span>
        </div>
        <span className="accordion-toggle">
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>

      <div
        className="accordion-content-wrapper"
        ref={contentRef}
        style={{ height: 0, overflow: 'hidden' }}
      >
        <div className="accordion-content">
          {item.content}
        </div>
      </div>
    </div>
  );
}
