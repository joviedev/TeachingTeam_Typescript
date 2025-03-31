import React, { useEffect, useState } from 'react';

/**
 * ScrollerToggle component displays a floating scroll-to-top button when user scrolls down.
 * Uses Material Icon: 'arrow_upward' from Google Fonts.
 * Can be imported and used on any page.
 */

const ScrollerToggle: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false); // Show/hide toggle button

  // Monitor scroll position to decide when to show the button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return isVisible ? (
    <button onClick={scrollToTop} style={styles.scrollButton} aria-label="Scroll to top">
      <span className="material-icons" style={styles.icon}>arrow_upward</span>
    </button>
  ) : null;
};

// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  scrollButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#085DB7',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease-in-out',
    zIndex: 999,
  },
  icon: {
    fontSize: '30px',
    color: '#fff',
  },
};

export default ScrollerToggle;
