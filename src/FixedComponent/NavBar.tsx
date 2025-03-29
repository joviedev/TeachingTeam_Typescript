import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  // State to track the currently active navigation tab
  const [activeTab, setActiveTab] = useState('About');
  // Whether a user is signed in or not
  const [isSignedIn, setIsSignedIn] = useState(false);
  // Tracks hover state for the log out button
  const [hoveredIcon, setHoveredIcon] = useState(false);
  // Role of the current user: either guest (not sign in), tutor, or lecturer
  const [userRole, setUserRole] = useState<'guest' | 'tutor' | 'lecturer'>('guest');
  // Initialize navigate function
  const navigate = useNavigate();

  // Called when a user logs out
  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserRole('guest');
    // Landing page always at 'About'
    setActiveTab('About');
    alert('You have been logged out.');
  };

  // Called when a user logs in (either tutor or lecturer)
  const handleSignIn = (role: 'tutor' | 'lecturer') => {
    setIsSignedIn(true);
    setUserRole(role);
    alert(`Signed in successfully as ${role}`);
  };

  // Navigation item component for reusability, on click, on hover effect
  const NavItem = ({
    label,
    isActive,
    onClick,
  }: {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <a
        href="#"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...styles.navItem,
          fontWeight: isActive || hovered ? 600 : 400,
          borderBottom: isActive ? '2px solid #085DB7' : 'none',
        }}
      >
        {label}
      </a>
    );
  };

  // Returns diff specific nav items based on role (either guest, tutor or lecturer)
  const renderNavItems = () => {
    if (!isSignedIn || userRole === 'guest') {
      return [
        { label: 'About', path: '/about' },
        { label: 'Opportunity', path: '/opportunity' },
        { label: 'Become a Tutor', path: '/become-a-tutor' },
      ];
    }

    if (userRole === 'tutor') {
      return [
        { label: 'Dashboard', path: '/tutor-dashboard' },
        { label: 'My Applications', path: '/my-applications' },
      ];
    }

    if (userRole === 'lecturer') {
      return [
        { label: 'Dashboard', path: '/lecturer-dashboard' },
        { label: 'Applications', path: '/applications' },
        { label: 'Review Tutors', path: '/review-tutors' },
      ];
    }

    return []; // Ensure fallback return
  };

  return (
    <nav style={styles.navBar}>
      {/* Navigation Links Section */}
      <div style={styles.navLinks}>
        {renderNavItems().map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            isActive={activeTab === item.label}
            onClick={() => {
              setActiveTab(item.label);
              navigate(item.path);
            }}
          />
        ))}
      </div>

      {/* Authentication Buttons Section */}
      <div
        style={styles.authWrapper}
        onMouseEnter={() => setHoveredIcon(true)}
        onMouseLeave={() => setHoveredIcon(false)}
      >
        <div style={styles.buttonGroup}>
          {!isSignedIn ? (
            <>
              <button
                style={styles.authButton}
                onClick={() => handleSignIn('tutor')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#085DB7';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                <span className="material-icons" style={styles.authIcon}>person</span>
                Sign In
              </button>

              <button
                style={styles.authButton}
                // Once select, navigate to /signup
                onClick={() => navigate('/signup')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#085DB7';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                Create Account
              </button>
            </>
          ) : (
            <button
              style={{
                ...styles.authButton,
                opacity: hoveredIcon ? 0.5 : 1,
                transition: 'opacity 0.2s ease-in-out',
              }}
              onClick={handleSignOut}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#085DB7';
                e.currentTarget.style.color = '#fff';
              }}
            >
              <span className="material-icons" style={styles.authIcon}>logout</span>
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

// Inline styling for the Header component
const styles: { [key: string]: React.CSSProperties } = {
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 60px',
    backgroundColor: '#F3F9FF',
    borderBottom: '1px solid #e0e0e0',
  },
  navLinks: {
    display: 'flex',
    gap: '70px',
  },
  navItem: {
    textDecoration: 'none',
    color: '#085DB7',
    fontSize: '16px',
    paddingBottom: '4px',
    transition: 'all 0.2s ease-in-out',
  },
  authWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  buttonGroup: {
    display: 'flex',
    gap: '25px',
  },
  authButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: '#085DB7',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  },
  authIcon: {
    fontSize: '18px',
  },
};

export default NavBar;
