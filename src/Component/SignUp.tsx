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

// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '40px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 700,
    marginBottom: '20px',
    color: '#1f1f1f',
  },
  formBox: {
    border: '2px solid #1A4AFF',
    borderRadius: '10px',
    padding: '30px',
    width: '400px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  noticeText: {
    fontSize: '15px',
    color: '#1f1f1f',
  },
};

export default SignUp;
