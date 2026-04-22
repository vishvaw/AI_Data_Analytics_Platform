// PRODUCTION-READY COMPONENT EXAMPLES
// Premium UI Components with Animations
// Import Framer Motion: npm install framer-motion

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// 1. ANIMATED BUTTON COMPONENT
// ============================================================================

export function AnimatedButton({ 
  children, 
  variant = 'primary',
  isLoading = false,
  onClick,
  disabled = false,
  style = {},
  ...props 
}) {
  return (
    <motion.button
      className={`btn btn--${variant}`}
      initial={{ scale: 1 }}
      whileHover={!disabled && !isLoading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={style}
      {...props}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
          className="spinner spinner--small"
        />
      ) : (
        children
      )}
    </motion.button>
  );
}

// ============================================================================
// 2. CARD COMPONENT WITH HOVER EFFECT
// ============================================================================

export function AnimatedCard({ 
  children, 
  onClick,
  interactive = false,
  style = {},
  ...props 
}) {
  return (
    <motion.div
      className={`card ${interactive ? 'card--interactive' : ''}`}
      initial={{ y: 0 }}
      whileHover={interactive ? { y: -4 } : {}}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 3. MODAL COMPONENT
// ============================================================================

export function AnimatedModal({ isOpen, onClose, children, title }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="modal"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
          >
            {title && (
              <div className="modal-header">
                <h2>{title}</h2>
              </div>
            )}
            <div className="modal-body">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// 4. TOAST NOTIFICATION COMPONENT
// ============================================================================

export function AnimatedToast({ 
  message, 
  type = 'info', 
  onClose,
  autoClose = true,
  duration = 3000 
}) {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <motion.div
      className={`toast toast--${type}`}
      initial={{ opacity: 0, x: 400, y: 100 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 400, y: 100 }}
    >
      {message}
    </motion.div>
  );
}

// ============================================================================
// 5. MESSAGE BUBBLE (CHAT)
// ============================================================================

export function MessageBubble({ 
  message, 
  isUser = false,
  timestamp 
}) {
  return (
    <motion.div
      className={`message ${isUser ? 'message--user' : 'message--ai'}`}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
    >
      <div className="message-bubble">
        <p>{message}</p>
        {timestamp && (
          <small style={{ opacity: 0.7, marginTop: '4px', display: 'block' }}>
            {timestamp}
          </small>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================================
// 6. INPUT FIELD WITH FOCUS ANIMATION
// ============================================================================

export function AnimatedInput({
  label,
  error,
  ...inputProps
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="input-group">
      {label && <label htmlFor={inputProps.id}>{label}</label>}
      <motion.input
        className={`input--${error ? 'error' : ''}`}
        initial={{ borderColor: 'var(--border-color)' }}
        animate={isFocused ? { 
          borderColor: '#3B82F6',
          boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
        } : {}}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        transition={{ duration: 0.25 }}
        {...inputProps}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            color: 'var(--color-error)',
            fontSize: 'var(--text-size-caption)',
            margin: '4px 0 0 0'
          }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ============================================================================
// 7. STAGGERED LIST
// ============================================================================

export function StaggeredList({ items, renderItem }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderItem(item)}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================================
// 8. SUCCESS STATE ANIMATION
// ============================================================================

export function SuccessAnimation({ onComplete }) {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 0.4
        }}
      >
        <div 
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px'
          }}
        >
          ✓
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Success!
      </motion.p>
    </motion.div>
  );
}

// ============================================================================
// 9. LOADING SKELETON
// ============================================================================

export function SkeletonLoader({ count = 3, height = '80px' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="loading-skeleton"
          style={{ height }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// 10. BADGE COMPONENT
// ============================================================================

export function AnimatedBadge({ 
  label, 
  type = 'info',
  icon,
  onRemove 
}) {
  return (
    <motion.div
      className={`badge badge--${type}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span>{icon}</span>}
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '4px',
            display: 'flex',
            alignItems: 'center',
            padding: 0
          }}
        >
          ✕
        </button>
      )}
    </motion.div>
  );
}

// ============================================================================
// 11. DROPDOWN MENU
// ============================================================================

export function DropdownMenu({ 
  trigger, 
  items, 
  onSelect 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '8px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              minWidth: '200px',
              zIndex: 'var(--z-dropdown)'
            }}
          >
            {items.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'var(--bg-secondary)' }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: 'var(--text-size-body)',
                  color: 'var(--text-primary)',
                  borderBottom: i < items.length - 1 ? '1px solid var(--border-color)' : 'none'
                }}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// 12. FORM WITH VALIDATION ANIMATION
// ============================================================================

export function AnimatedForm({ 
  fields, 
  onSubmit,
  submitLabel = 'Submit'
}) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        variants={animations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        {fields.map((field, i) => (
          <motion.div
            key={i}
            variants={animations.staggerItem}
          >
            <AnimatedInput
              label={field.label}
              name={field.name}
              type={field.type || 'text'}
              placeholder={field.placeholder}
              value={values[field.name] || ''}
              onChange={handleChange}
              error={errors[field.name]}
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatedButton
        variant="primary"
        type="submit"
        isLoading={isSubmitting}
        style={{ marginTop: '24px' }}
      >
        {submitLabel}
      </AnimatedButton>
    </form>
  );
}

// ============================================================================
// 13. ANIMATED PAGE TRANSITION
// ============================================================================

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 14. TOAST CONTAINER
// ============================================================================

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

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// Example 1: Button
<AnimatedButton variant="primary" onClick={handleClick}>
  Click me
</AnimatedButton>

// Example 2: Modal
const [isOpen, setIsOpen] = useState(false);
<>
  <button onClick={() => setIsOpen(true)}>Open Modal</button>
  <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example">
    Modal content here
  </AnimatedModal>
</>

// Example 3: Staggered List
<StaggeredList 
  items={['Item 1', 'Item 2', 'Item 3']}
  renderItem={(item) => <div className="card">{item}</div>}
/>

// Example 4: Form
<AnimatedForm
  fields={[
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' }
  ]}
  onSubmit={async (values) => console.log(values)}
/>

// Example 5: Toast Notification
const [toasts, setToasts] = useState([]);
<>
  <button onClick={() => setToasts([...toasts, { id: Date.now() }])}>
    Show Toast
  </button>
  <AnimatePresence>
    {toasts.map(toast => (
      <AnimatedToast
        key={toast.id}
        message="Success!"
        type="success"
        onClose={() => setToasts(t => t.filter(x => x.id !== toast.id))}
      />
    ))}
  </AnimatePresence>
</>
*/
