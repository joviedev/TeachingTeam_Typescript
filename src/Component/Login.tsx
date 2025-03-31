import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Login component for TeachTeam.
 * Including dummy credentials to login as different roles, either tutor and lecturer
 * Allow different role works on differet functionality
 */

// Define props to receive authentication handlers
type LoginProps = {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<'guest' | 'tutor' | 'lecturer'>>;
};

const Login: React.FC<LoginProps> = ({ setIsSignedIn, setUserRole }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Dummy users (3 tutors and 3 lecturers)
  const dummyUsers = [
    { email: 'tutor1@tutor.com', password: 'Tutor123!', role: 'tutor' },
    { email: 'tutor2@tutor.com', password: 'Tutor234!', role: 'tutor' },
    { email: 'tutor3@tutor.com', password: 'Tutor345!', role: 'tutor' },
    { email: 'lecturer1@lecturer.com', password: 'Lecturer123!', role: 'lecturer' },
    { email: 'lecturer2@lecturer.com', password: 'Lecturer234!', role: 'lecturer' },
    { email: 'lecturer3@lecturer.com', password: 'Lecturer345!', role: 'lecturer' },
  ];

  // Validate email on blur
  const handleEmailBlur = () => {
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  // Validate password on blur
  const handlePasswordBlur = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  };

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    const matchedUser = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      setError('Incorrect email or password.');
      return;
    }

    // On successful login
    setError('');
    setIsSignedIn(true);
    setUserRole(matchedUser.role as 'tutor' | 'lecturer');
    alert(`✅ Login successful as ${matchedUser.role}`);

    if (matchedUser.role === 'tutor') {
      navigate('/tutor-dashboard');
    } else {
      navigate('/lecturer-dashboard');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.formBox}>
        {/* Title */}
        <h1 style={styles.title}>Welcome Back</h1>

        {/* Subtitle */}
        <p style={styles.subtitle}>Login to your account</p>

        {/* Email Field */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email :</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            placeholder="Enter your email"
          />
          {emailError && <p style={styles.error}>{emailError}</p>}
        </div>

        {/* Password Field */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password :</label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
            placeholder="Enter your password"
          />
          {passwordError && <p style={styles.error}>{passwordError}</p>}
        </div>

        {/* Incorrect error */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Forgot Password */}
        <div style={styles.forgotLine}>
          <span style={styles.link}>Forgot Password?</span>
        </div>

        {/* CAPTCHA Placeholder */}
        <div style={styles.captchaPlaceholder}></div>

        {/* Submit */}
        <button type="submit" style={styles.submitButton}>Login</button>

        {/* Register */}
        <div style={styles.registerLine}>
          Don’t have an Account?
          <span style={styles.link} onClick={() => navigate('/signup')}>
            {' '}Sign Up Here
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;

// Inline styles below
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 'calc(100vh - 160px)',
    padding: '10px 15px 0',
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
  },

  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#000000',
    marginTop: '10px',
    marginBottom: '0px',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: '16px',
    fontWeight: 400,
    color: '#1f1f1f',
    marginTop: '2px',
    marginBottom: '30px',
    textAlign: 'center',
  },

  inputGroup: {
    marginBottom: '15px',
  },

  label: {
    display: 'block',
    fontSize: '15px',
    fontWeight: 500,
    color: '#000000',
    marginBottom: '10px',
  },

  input: {
    width: '100%',
    padding: '14px 16px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    backgroundColor: '#ffffff',
  },

  error: {
    color: '#dc2626',
    fontSize: '14px',
    fontWeight: 500,
    marginTop: '6px',
  },

  forgotLine: {
    fontSize: '14px',
    color: '#4b5563',
    textAlign: 'right',
    marginTop: 6,
  },

  registerLine: {
    fontSize: '14px',
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 24,
  },

  link: {
    color: '#085DB7',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 500,
    marginLeft: '4px',
  },

  submitButton: {
    width: '100%',
    backgroundColor: '#085DB7',
    color: '#ffffff',
    padding: '14px',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '18px',
    marginTop: '20px',
    cursor: 'pointer',
    border: 'none',
  },

  captchaPlaceholder: {
    height: 60,
  },
};
