import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/auth/AuthProvider';
import { JSX } from 'react';

// This tsx is cerated to make sure that only signed-in users can access certain pages
// If a user is not signed in, they will be redirected to the login page.

type ProtectedRouteProps = {
  children: JSX.Element; // The protected page or component to display
}; 

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { isSignedIn } = useAuth(); // Get user's signed-in status from the authentication context

  // If user is NOT signed in, redirect them to the login pag
  if (!isSignedIn) {
    return (
      <Navigate to='/login' replace />
    );
  }
  // If user is signed in, allow them to see the protected page
  return children;
};

export default ProtectedRoute;
