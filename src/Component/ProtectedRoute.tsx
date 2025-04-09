import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/auth/AuthProvider';
import { JSX } from 'react';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <Navigate to='/login' replace />
    );
  }

  return children;
};

export default ProtectedRoute;
