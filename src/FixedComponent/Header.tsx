import React, { useState } from 'react';

/**
 * Header component for the website.
 * Includes logo, navigation links, and a profile icon with active tab highlighting.
 */
const Header = () => {
  // Track the current and selected tab for highlighting
    const [activeTab, setActiveTab] = useState('About');

  return (
    <header style={styles.headerContainer}>
      {/* Left Section: Logo and Subheading */}
      <div style={styles.logoSection}>
        <h1 style={styles.logoMain}>TeachTeam</h1>
        <p style={styles.logoSub}>School of Computer Science</p>
      </div>

      {/* Right Section: Navigation links and profile icon */}
      <div style={styles.rightSection}>

        {/* Navigation Links */}
        <nav style={styles.navLinks}>
        {['About', 'Join Us', 'Tutor', 'Lecturer'].map((item) => (
        <a
            key={item}
            href="#"
            onClick={() => setActiveTab(item)}
            style={{
              ...styles.navItem,
              ...(activeTab === item ? styles.active : {}),
            }}
        >
            {item}
            </a>
          ))}
        </nav>

        {/* Profile Icon (Color change when selected or in current tab) */}
        <div
            onClick={() => setActiveTab('Profile')}
            style={{
              ...styles.profileIcon,
              ...(activeTab === 'Profile' ? styles.active : {}),
              cursor: 'pointer',
            }}
          >
            <span
              className="material-icons"
              style={{
                ...styles.icon,
                color: activeTab === 'Profile' ? '#063A85' : '#085DB7',
              }}
            >
              account_circle
            </span>
        </div>
      </div>
    </header>
  );
};

// Inline styling for the Header component
const styles: { [key: string]: React.CSSProperties } = {
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#F3F9FF',
      padding: '15px 40px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      fontFamily: "'Poppins', sans-serif",
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
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '60px',
      paddingRight: '10px',
      minWidth: '500px',
    },
    navLinks: {
      display: 'flex',
      gap: '60px',
    },
    navItem: {
      textDecoration: 'none',
      fontWeight: 400,
      color: '#085DB7',
      fontSize: '16px',
      position: 'relative',
      paddingBottom: '4px',
    },
    active: {
      fontWeight: 600,
      borderBottom: '2px solid #085DB7',
    },
    profileIcon: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      fontSize: '48px',
      color: '#085DB7',
    },
  };
  
  export default Header;
