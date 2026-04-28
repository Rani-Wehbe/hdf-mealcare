import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { scaleBounceVariants, fadeOutVariants } from '../utils/animations';
import './Modal.css';

/**
 * Modal Component with smooth animations using Framer Motion
 */
export default function Modal({ isOpen, title, children, onClose, actions = [] }) {
  const backdropRef = useRef(null);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose?.();
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          ref={backdropRef}
          onClick={handleBackdropClick}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="modal"
            variants={scaleBounceVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="modal-header">
              <h2>{title}</h2>
              <button className="modal-close" onClick={onClose}>
                ✕
              </button>
            </div>

            <div className="modal-content">
              {children}
            </div>

            {actions.length > 0 && (
              <div className="modal-actions">
                {actions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant={action.variant || 'secondary'}
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
