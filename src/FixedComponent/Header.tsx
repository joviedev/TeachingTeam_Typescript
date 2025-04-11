import React from 'react';

/**
 * Header component for TeachTeam.
 * Only includes the logo and subheading.
 */
const Header = () => {
  return (
    <header style={styles.headerContainer}>
      <div style={styles.logoSection}>
        <h1 style={styles.logoMain}>TeachTeam</h1>
        <p style={styles.logoSub}>School of Computer Science</p>
      </div>
    </header>
  );
};

// Styling for the Header component
const styles: { [key: string]: React.CSSProperties } = {
  headerContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 1000, 
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F3F9FF',
    padding: '15px 40px 5px 40px',
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.05)',
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px',
  },
  logoMain: {
    fontWeight: 600,
    fontSize: '24px',
    color: '#085DB7',
    margin: 0,
  },
  logoSub: {
    fontWeight: 300,
    fontSize: '12px',
    color: '#085DB7',
    marginTop: '2px',
  },
};

export default Header;
