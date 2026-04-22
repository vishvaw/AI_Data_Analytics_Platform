import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AnimatedToast } from './AnimatedComponents';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 800 }}>
      <AnimatePresence>
        {toasts.map(toast => (
          <AnimatedToast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => onRemove(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}