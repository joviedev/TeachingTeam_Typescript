import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // Get current route path

  // Navigation items with route paths
  const navItems = [
    { label: 'About', path: '/' },
    { label: 'Join Us', path: '/join' },
    { label: 'Tutor', path: '/tutor' },
    { label: 'Lecturer', path: '/lecturer' },
  ];

  return (
    <header style={styles.headerContainer}>
      {/* Logo and subheading */}
      <div style={styles.logoSection}>
        <h1 style={styles.logoMain}>TeachTeam</h1>
        <p style={styles.logoSub}>School of Computer Science</p>
      </div>

      {/* Navigation and profile */}
      <div style={styles.rightSection}>
        {/* Nav Links */}
        <nav style={styles.navLinks}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              style={{
                ...styles.navItem,
                ...(location.pathname === item.path ? styles.active : {}),
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Profile Icon */}
        <div style={{ ...styles.profileIcon, cursor: 'pointer' }}>
          <span
            className="material-icons"
            style={{
              ...styles.icon,
              color: '#085DB7',
            }}
          >
            account_circle
          </span>
        </div>
      </div>
    </header>
  );
};

// Styling
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
  },
};

export default Header;
