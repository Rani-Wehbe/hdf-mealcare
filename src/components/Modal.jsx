import React, { useEffect, useRef } from 'react';
import Button from './ui/Button';
import { animateScaleBounce, animateFadeOut } from '../utils/animations';
import './Modal.css';

/**
 * Modal Component with smooth animations
 */
export default function Modal({ isOpen, title, children, onClose, actions = [] }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      animateScaleBounce(modalRef.current, { duration: 400 });
    }
  }, [isOpen]);

  const handleClose = async () => {
    if (modalRef.current) {
      await animateFadeOut(modalRef.current, { duration: 300 });
    }
    onClose?.();
  };

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div className="modal" ref={modalRef}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={handleClose}>
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
      </div>
    </div>
  );
}
