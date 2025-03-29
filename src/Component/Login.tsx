import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginProps = {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<'guest' | 'tutor' | 'lecturer'>>;
};

/**
 * Sign-in component for user login.
 * Validates email/password against dummy users and redirects by role.
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

  // Handle user login with validation
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!strongPasswordRegex.test(password)) {
      setError('Password must include uppercase, number, and symbol.');
      return;
    }

    const matchedUser = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      setError('Incorrect email or password.');
      return;
    }

    // Success: update auth state and redirect
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 font-[Poppins] bg-white">
      <h1 className="text-4xl font-bold text-[#085DB7] mb-6">Sign In</h1>

      <form
        onSubmit={handleLogin}
        className="border border-[#085DB7] rounded-xl p-8 w-full max-w-md shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-black">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-[#085DB7]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-black">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-[#085DB7]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4 font-medium">{error}</p>}

        <div className="text-sm text-center mb-4 text-gray-600">
          Can't remember your password?{' '}
          <span className="text-[#085DB7] cursor-pointer hover:underline">Click Here</span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#085DB7] text-white py-2 rounded-full font-semibold hover:opacity-90 transition"
        >
          Submit
        </button>

        <div className="text-sm text-center mt-4 text-gray-600">
          Need an account?{' '}
          <span
            className="text-[#085DB7] cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Register Here
          </span>
        </div>
      </form>

      <div className="mt-6 text-sm text-center text-gray-600">
        Questions? Contact our{' '}
        <span className="text-[#085DB7] cursor-pointer hover:underline">
          Membership Coordinator
        </span>
      </div>
    </div>
  );
};

export default Login;
