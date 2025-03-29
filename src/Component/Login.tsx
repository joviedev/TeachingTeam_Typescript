import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginProps = {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<'guest' | 'tutor' | 'lecturer'>>;
};

/**
 * Sign-in component for user login.
 * Matches email/password against dummy users and redirects by role.
 */
const Login: React.FC<LoginProps> = ({ setIsSignedIn, setUserRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Dummy user database
  const dummyUsers = [
    { email: 'tutor@example.com', password: 'Tutor123!', role: 'tutor' },
    { email: 'lecturer@example.com', password: 'Lecturer123!', role: 'lecturer' },
  ];

  // Handle user login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check credentials against dummy users
    const matchedUser = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      setError('Incorrect email or password.');
      return;
    }

    // On success: update app state
    setError('');
    setIsSignedIn(true);
    setUserRole(matchedUser.role as 'tutor' | 'lecturer');
    alert(`✅ Login successful as ${matchedUser.role}`);

    // Redirect to dashboard
    if (matchedUser.role === 'tutor') {
      navigate('/tutor-dashboard');
    } else {
      navigate('/lecturer-dashboard');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sign In</h1>

      <form onSubmit={handleLogin} style={styles.form}>
        {/* Email Field */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {/* Error Message */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Forgot Password */}
        <div style={styles.textLine}>
          Can't remember your password?{' '}
          <span style={styles.link}>Click Here</span>
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>

        {/* Redirect to Register */}
        <div style={{ ...styles.textLine, marginTop: 16 }}>
          Need an account?{' '}
          <span style={styles.link} onClick={() => navigate('/signup')}>
            Register Here
          </span>
        </div>

        {/* Footer Inside Form Box */}
        <div style={{ ...styles.textLine, marginTop: 24 }}>
          Questions? Contact our{' '}
          <span style={styles.link}>Membership Coordinator</span>
        </div>
      </form>
    </div>
  );
};

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
  form: {
    border: '1px solid #085DB7',
    borderRadius: '1.25rem',
    padding: '2rem',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: '#000000',
  },
  input: {
    width: '100%',
    padding: '0.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '0.375rem',
    outline: 'none',
    fontSize: '1rem',
  },
  error: {
    color: '#dc2626',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '1rem',
  },
  textLine: {
    fontSize: '0.875rem',
    color: '#4b5563',
    textAlign: 'center',
  },
  link: {
    color: '#085DB7',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginLeft: '0.25rem',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#085DB7',
    color: '#ffffff',
    padding: '0.5rem',
    borderRadius: '9999px',
    fontWeight: 600,
    fontSize: '1rem',
    marginTop: '0.5rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'opacity 0.3s ease-in-out',
  },
};

export default Login;
