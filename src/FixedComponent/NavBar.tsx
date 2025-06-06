import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdInbox } from 'react-icons/md'; // ✅ Material Design Inbox Icon
import './navbar.css';
import { useAuth } from '@/utils/auth/AuthProvider';
import { useInbox } from '@/utils/global/InBoxProvider';


/**
 * NavBar component for TeachTeam.
 * Only navigation item including sign in, sign up and logout if an account is signed in
 */

// Define props for NavBar to receive authentication state and logout handler
interface NavBarProps {
  // Boolean flag is to determine if the user is currently signed in
  isSignedIn: boolean;
  // Sign in as what role (guest is when a user did not sign in to account)
  userRole: 'guest' | 'tutor' | 'lecturer';
  // Execute when the user select "Log Out"
  handleSignOut: () => void;
}

// NavBar functional component on whether the user is signed in, their role, and a logout handler
const NavBar: React.FC<NavBarProps> = ({ userRole, handleSignOut }) => {
  const location = useLocation(); // Get current URL path
  const currentPath = location.pathname;// Store current path for active link highlighting
  const navigate = useNavigate(); // Allow programmatic page navigation

  const { isSignedIn, logout, role, userInfo } = useAuth(); // Get authentication state from custom hook
  const { checkInbox, inboxCount, setInboxCount } = useInbox(); // Get inbox state from custom hook

  const [logoutMessage, setLogoutMessage] = useState(''); // State to store logout success message

  // When the component mounts or userInfo changes, check the user's inbox
  useEffect(() => {
    if (userInfo) {
      checkInbox(userInfo); // Fetch inbox data for the logged-in user
    }
  }, [checkInbox, userInfo]);

  // Component for nav links, highlight on hover or active
  const NavItem = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => {
    const [hovered, setHovered] = useState(false); // Local state to track whether the item is being hovered
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

  const renderNavItems = () => {
    if (!isSignedIn || role === 'guest') {
      return [
        { label: 'About', path: '/' },
        { label: 'Become a Tutor', path: '/become-a-tutor' },
      ];
    }
    if (role === 'tutor') {
      return [
        { label: 'Dashboard', path: '/tutor-dashboard' },
        { label: 'My Applications', path: '/my-applications' },
      ];
    }
    if (role === 'lecturer') {
      return [
        { label: 'Dashboard', path: '/lecturer-dashboard' },
        { label: 'Applications', path: '/applications' },
        { label: 'Review Tutors', path: '/review-tutors' },
      ];
    }
    return [];
  };

  return (
    <>
      {logoutMessage && (
        <div style={styles.successModalOverlay}>
          <div style={styles.successModal}>{logoutMessage}</div>
        </div>
      )}

      <nav className='nav-bar'>
        {/* Left nav links */}
        <div style={styles.navLinks}>
          {renderNavItems().map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              isActive={currentPath === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>

        {/* Right auth section */}
        <div
          className='auth-wrapper'
        >
          <div style={styles.buttonGroup}>
            {!isSignedIn ? (
              <>
                <button
                  className='operation-button'
                  onClick={() => navigate('/login')}
                >
                  <span className="material-icons">person</span>
                  Sign In
                </button>
                <button
                  className='operation-button'
                  style={styles.authButton}
                  onClick={() => navigate('/signup')}
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                {/* ✅ Inbox button */}
                <button
                  className={`inbox-button ${inboxCount > 0 ? 'has-notification' : ''}`}
                  onClick={() => {
                    setInboxCount(0);
                    navigate('/inbox');
                  }}
                  title="Inbox"
                >
                  <span className="material-symbols-outlined">inbox</span>
                  Inbox
                </button>

                {/* Logout button */}
                <button
                  className='operation-button sign-out'
                  onClick={() => {
                    // Clear session properly here
                    localStorage.removeItem('isSignedIn');
                    localStorage.removeItem('redirectAfterLogin');
                    localStorage.removeItem('selectedCourse');

                    logout();

                    handleSignOut(); // still call your App.tsx handleSignOut()

                    setLogoutMessage('You have been successfully logged out.');

                    setTimeout(() => {
                      setLogoutMessage('');
                      navigate('/');
                    }, 3000);
                  }}
                >
                  <span className="material-icons" style={styles.authIcon}>logout</span>
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navBar: {
    position: 'sticky',
    top: 84,
    zIndex: 1000,
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
  inboxButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: '#E0F2FE',
    color: '#0369a1',
    border: 'none',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  authIcon: {
    fontSize: '18px',
  },
  successModalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10001,
  },
  successModal: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: '20px 30px',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
};

export default NavBar;
