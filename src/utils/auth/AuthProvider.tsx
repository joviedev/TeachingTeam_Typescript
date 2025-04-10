import {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from 'react';
import { formatJson } from '..';
import { ApplicationInterface } from '@/Pages/ApplyForm';

export type UserInfo = {
  email: string;
  role: string;
  applications?: ApplicationInterface;
}

type RoleType = 'guest' | 'tutor' | 'lecturer';

type AuthContextType = {
  isSignedIn: boolean;
  userInfo: UserInfo | null;
  login: (userInfo: UserInfo) => void;
  logout: () => void;
  role: RoleType;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: PropsWithChildren) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [role, setRole] = useState<RoleType>('guest');

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userInfo = formatJson(localStorage.getItem('userInfo'));
    if (userInfo) {
      setIsSignedIn(true);
      setUserInfo(userInfo);
      setRole(userInfo.role)
    }
    setIsReady(true);
  }, []);

  const login = (userInfo: UserInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setIsSignedIn(true);
    setUserInfo(userInfo);
    setRole(userInfo.role as RoleType);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setIsSignedIn(false);
    setUserInfo(null);
  };

  const value = useMemo(() => ({
    isSignedIn,
    userInfo,
    login,
    logout,
    role
  }), [isSignedIn, userInfo, role]);

  return (
    <AuthContext.Provider
      value={value}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext) as AuthContextType;
