import React from 'react';

/**
 * SignUp component (layout only)
 * Functionality is not required in Assignment 1 – content placeholder only.
 */
const SignUp = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sign Up</h1>

      <div style={styles.formBox}>
        <p style={styles.noticeText}>
          ⚠️ Registration functionality is not required at this stage. This will be implemented in Assignment 2.
        </p>
      </div>
    </div>
  );
};

// Inline styles (aligned with Sign In box styling)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 160px)',
    padding: '0 1rem',
    backgroundColor: '#ffffff',
    fontFamily: 'Poppins, sans-serif',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 700,
    color: '#085DB7',
    marginBottom: '1.5rem',
  },
  formBox: {
    border: '1px solid #085DB7',
    borderRadius: '0.75rem',
    padding: '2rem',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  noticeText: {
    fontSize: '15px',
    color: '#1f1f1f',
  },
};

export default SignUp;
