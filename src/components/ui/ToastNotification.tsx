import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';
import { CheckCircle, Info, Warning, X } from '@phosphor-icons/react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useProducts();

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => {
          let icon = <CheckCircle size={20} weight="fill" color="#5283A4" />;
          let bg = '#FFFFFF';
          let border = '#C5EFFA';

          if (toast.type === 'warning') {
            icon = <Warning size={20} weight="fill" color="#DE9B16" />;
            border = '#F5E48C';
          } else if (toast.type === 'info') {
            icon = <Info size={20} weight="fill" color="#87A9C2" />;
            border = '#DDECF3';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: bg,
                border: `2px solid ${border}`,
                borderRadius: '14px',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 8px 24px rgba(111, 145, 170, 0.2)',
                pointerEvents: 'auto',
                minWidth: '280px',
                maxWidth: '400px',
              }}
            >
              <div style={{ flexShrink: 0 }}>{icon}</div>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#374A58',
                  flexGrow: 1,
                }}
              >
                {toast.message}
              </p>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                style={{
                  color: '#A9BDCC',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px',
                }}
              >
                <X size={16} weight="bold" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

