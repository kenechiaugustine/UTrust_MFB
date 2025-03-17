import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root') || document.createElement('div');
  if (!document.getElementById('modal-root')) {
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        {' '}
        <div className="modal-header">
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
