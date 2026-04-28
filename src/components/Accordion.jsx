import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideDownVariants, slideUpVariants } from '../utils/animations';
import './Accordion.css';

/**
 * Accordion Component with smooth animations using Framer Motion
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
  return (
    <div className={`accordion-item ${isExpanded ? 'expanded' : ''}`}>
      <button className="accordion-header" onClick={onToggle}>
        <div className="accordion-title">
          {item.icon && <span className="accordion-icon">{item.icon}</span>}
          <span>{item.title}</span>
        </div>
        <motion.span
          className="accordion-toggle"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="accordion-content-wrapper"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideDownVariants}
          >
            <div className="accordion-content">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
