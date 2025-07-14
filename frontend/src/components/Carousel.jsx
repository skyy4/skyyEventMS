import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const collabMessages = [
  'Brought to you by your campus clubs',
  'More surprises await below!',
  'Your next adventure starts here',
  'Events powered by students, for students',
  'Scroll for the unexpected!'
];

function Brandcarousel() {
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % collabMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="brandcarousel-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        minHeight: 120,
        overflow: 'hidden',
        margin: '24px 0',
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 32,
        boxShadow: '0 4px 24px 0 rgba(103, 58, 183, 0.08)',
        position: 'relative',
        padding: '16px 0',
        zIndex: 1,
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -30, scale: 1 }}
        animate={{ opacity: 1, y: 0, scale: [1, 1.08] }}
        transition={{ duration: 1, type: 'spring', bounce: 0.4, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }}
        style={{
          fontSize: '2.2rem',
          fontWeight: 900,
          color: '#512da8',
          textAlign: 'center',
          margin: 0,
          letterSpacing: '1px',
          textShadow: '0 2px 12px rgba(103,58,183,0.10)',
          padding: '8px 0 0 0',
        }}
      >
        Scroll down for more fun
      </motion.h2>
      <div style={{ height: 44, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}x
            style={{
              fontWeight: 700,
              fontSize: '1.15rem',
              color: '#7b1fa2',
              textAlign: 'center',
              letterSpacing: 0.2,
              textShadow: '0 2px 8px #ede7f6',
              padding: '6px 32px',
              borderRadius: 16,
              background: 'rgba(245,245,255,0.7)',
              backdropFilter: 'blur(4px)',
              border: '1.5px solid #b39ddb',
              minWidth: 260,
              maxWidth: 420,
              margin: '0 auto',
              position: 'relative',
              boxShadow: '0 2px 12px 0 rgba(103, 58, 183, 0.06)',
            }}
          >
            {collabMessages[msgIdx]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Brandcarousel;
