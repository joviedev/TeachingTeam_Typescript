import React from 'react';

/**
 * SignUp page placeholder – UI matches the login layout with message inside a rounded box.
 */

const SignUp: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join us now to inspire the next generation</p>
        <div style={styles.iconWrapper}>
        <span className="material-icons" style={styles.icon}>engineering</span>
      </div>
          {/* Maintenance message */}
          <p style={styles.maintenanceText}>Under Maintenance. We will be back soon.</p>

      </div>
    </div>
  );
};

// Inline styles for the component
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 'calc(100vh - 160px)',
    maxHeight: '100vh',
    padding: '10px 15px 0',
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    fontFamily: 'Poppins, sans-serif',
  },
  formBox: {
    borderRadius: '16px',
    padding: '60px',
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#CDECFF',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginTop: '15px',
    paddingTop: '15px',
    paddingBottom: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#000000',
    marginTop: '10px',
    marginBottom: '0px',
  },
  subtitle: {
    fontSize: '16px',
    fontWeight: 400,
    color: '#1f1f1f',
    marginTop: '2px',
    marginBottom: '30px',
  },
  maintenanceText: {
    fontSize: '20px',
    color: '#000',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '80px',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '50px',
    color: '#555',
  },
  
};

export default SignUp;
