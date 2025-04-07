import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 🔥 Add useLocation to get previous page

/**
 * Login component for TeachTeam.
 * Including dummy credentials to login as different roles, either tutor and lecturer.
 * Allows different role to access different functionalities.
 * Includes validation and visual cue (success box) after successful login.
 * CAPTCHA placeholder included.
 */

// Define props to receive authentication handlers
type LoginProps = {
  // update whether the user is logged in
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  // update the user's role (guest, tutor, or lecturer)
  setUserRole: React.Dispatch<React.SetStateAction<'guest' | 'tutor' | 'lecturer'>>;
};

// Define the Login component and receive functions as props to update sign-in status and user role
const Login: React.FC<LoginProps> = ({ setIsSignedIn, setUserRole }) => {
  // Used to redirect the user to another page
  const navigate = useNavigate();
  const location = useLocation(); // 🔥 Get where the user came from (before login)

  // Store the email input from the user
  const [email, setEmail] = useState('');
  // Store the password input from the user
  const [password, setPassword] = useState('');
  // General error message for login failure for either wrong email or password
  const [error, setError] = useState('');
  // Specific error for email validation
  const [emailError, setEmailError] = useState('');
  // Specific error for password validation
  const [passwordError, setPasswordError] = useState('');
  // Message cue to show when login is successful
  const [successMessage, setSuccessMessage] = useState('');

  // Rule to check if email is in a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Rule to check if password is strong, using most common setup which is: at least 6 characters, with uppercase, lowercase, and a number
  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

  // Dummy users as required for phase 1
  const dummyUsers = [
    { email: 'tutor1@tutor.com', password: 'Tutor123!', role: 'tutor' },
    { email: 'tutor2@tutor.com', password: 'Tutor234!', role: 'tutor' },
    { email: 'tutor3@tutor.com', password: 'Tutor345!', role: 'tutor' },
    { email: 'lecturer1@lecturer.com', password: 'Lecturer123!', role: 'lecturer' },
    { email: 'lecturer2@lecturer.com', password: 'Lecturer234!', role: 'lecturer' },
    { email: 'lecturer3@lecturer.com', password: 'Lecturer345!', role: 'lecturer' },
  ];

  // When the user finishes typing email and clicks away, check if the email is valid
  const handleEmailBlur = () => {
    if (!emailRegex.test(email)) {
      // Show error message if email is not in correct format
      setEmailError('Please enter a valid email address.');
    } else {
      // Clear the error message if email is valid
      setEmailError('');
    }
  };

  // When the user finishes typing password and clicks away, check if the password is strong
  const handlePasswordBlur = () => {
    if (!strongPasswordRegex.test(password)) {
      // Show error message if password is too weak
      setPasswordError('Password must be at least 6 characters and include a number and uppercase letter.');
    } else {
      // Clear the error message if password is strong
      setPasswordError('');
    }
  };

  // Clear password error as user types valid input
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (strongPasswordRegex.test(newPassword)) {
      setPasswordError('');
    }
  };

  // Clear email error as user types valid input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailRegex.test(newEmail)) {
      setEmailError('');
    }
  };

  // Handle login runs when the user clicks the login button
  const handleLogin = (e: React.FormEvent) => {
    // Stop the page from refreshing
    e.preventDefault();

    // Clear all previous error messages
    setError('');
    setEmailError('');
    setPasswordError('');

    // Start by assuming everything is valid
    let valid = true;

    // Check if email format is correct
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }
    // Check if password is strong
    if (!strongPasswordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters and include a number and uppercase letter.');
      valid = false;
    }
    // If email or password is invalid, stop the login process
    if (!valid) return;

    // Check if the input email and password match any data in the dummy user list above
    const matchedUser = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    // If no match is found, show an error message and stop the login
    if (!matchedUser) {
      setError('Incorrect email or password.');
      return;
    }

    // On successful login:
    // 1. Mark the user as signed in
    setIsSignedIn(true);
    // 2. Set the user's role (either tutor or lecturer)
    setUserRole(matchedUser.role as 'tutor' | 'lecturer');
    localStorage.setItem('isSignedIn', 'true');
    // 4. Show a success message cue in the center of the screen
    setSuccessMessage(`Successfully logged in as ${matchedUser.role}`);

    // 5. Wait for 3 seconds, then:
    setTimeout(() => {
      setSuccessMessage('');
      const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
        if (redirectAfterLogin === 'apply') {
          localStorage.removeItem('redirectAfterLogin');
          navigate('/apply-form'); // Go to application form
        } else {
          navigate(matchedUser.role === 'tutor' ? '/tutor-dashboard' : '/lecturer-dashboard');
        }

      const from = (location.state as { from?: string })?.from || '/';
      navigate(from);
    }, 3000);
  };

  // render login ui section
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
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            placeholder="Enter your password"
          />
          {passwordError && <p style={styles.error}>{passwordError}</p>}
        </div>

        {/* General Error */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Success Modal Pop-up */}
        {successMessage && (
          <div style={styles.successModalOverlay}>
            <div style={styles.successModal}>
              {successMessage}
            </div>
          </div>
        )}

        {/* Forgot Password */}
        <div style={styles.forgotLine}>
          <span style={styles.link}>Forgot Password?</span>
        </div>

        {/* CAPTCHA Placeholder (required by COSC2938 students) */}
        <div style={styles.captchaPlaceholder}>
          {/* Insert your CAPTCHA here in future (e.g., hCaptcha / reCAPTCHA) */}
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.submitButton}>Login</button>

        {/* Register Section */}
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

// Inline styling object for the section
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
    zIndex: 1000,
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
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
};