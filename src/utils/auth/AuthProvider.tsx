import {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from 'react';
import { formatJson } from '..';
import { ApplicationInterface } from '@/Pages/ApplyForm';

// Define the shape of user information
export type UserInfo = {
  email: string;
  role: string; // user role: 'tutor' or 'lecturer'
  applications?: ApplicationInterface; // optional: their application data
}
// Define possible roles
type RoleType = 'guest' | 'tutor' | 'lecturer';

// Define what the Authentication Context will provide
type AuthContextType = {
  isSignedIn: boolean;          // whether the user is logged in
  userInfo: UserInfo | null;     // the user's info (email, role, etc.)
  login: (userInfo: UserInfo) => void; // function to login
  logout: () => void;            // function to logout
  role: RoleType;                // user's role
};

// Create the Authentication Context (initially null)
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider wraps the app and manages login/logout
const AuthProvider = ({ children }: PropsWithChildren) => {
  // State to track if the user is signed in
  const [isSignedIn, setIsSignedIn] = useState(false);

  // State to store user information
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // State to store user's role ('guest', 'tutor', or 'lecturer')
  const [role, setRole] = useState<RoleType>('guest');

  // State to make sure data from localStorage is loaded before rendering
  const [isReady, setIsReady] = useState(false);

  // Load user info from localStorage on first load
  useEffect(() => {
    const userInfo = formatJson(localStorage.getItem('userInfo'));
    if (userInfo) {
      setIsSignedIn(true);
      setUserInfo(userInfo);
      setRole(userInfo.role);
    }
    setIsReady(true); // Allow rendering after checking
  }, []);

  // Function to handle user login
  const login = (userInfo: UserInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Save to localStorage
    setIsSignedIn(true); // Update state
    setUserInfo(userInfo);
    setRole(userInfo.role as RoleType);
  };
  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('userInfo'); // Clear localStorage
    setIsSignedIn(false); // Reset state
    setUserInfo(null);
  };
  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({
    isSignedIn,
    userInfo,
    login,
    logout,
    role
  }), [isSignedIn, userInfo, role]);
  // Provide the auth value to all child components
  return (
    // {/* Only render app content after loading localStorage check */}
    <AuthContext.Provider
      value={value}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

// Export the AuthProvider to wrap the app
export default AuthProvider;
// Export a custom hook to easily use Auth anywhere
export const useAuth = () => useContext(AuthContext) as AuthContextType;
