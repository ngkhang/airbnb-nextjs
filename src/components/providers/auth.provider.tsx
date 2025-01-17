'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { KEY } from '@/constants/key';
import type { User } from '@/types/user.type';

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<User | null>(
    () =>
      // if (isClient()) {
      //   const _user = localStorage.getItem(KEY.USER)
      //   return _user ? JSON.parse(_user) : null
      // }
      null
  );

  const setUser = useCallback(
    (user: User | null) => {
      setUserState(user);
      localStorage.setItem(KEY.USER, JSON.stringify(user));
    },
    [setUserState]
  );

  useEffect(() => {
    const _user = localStorage.getItem(KEY.USER);
    setUserState(_user ? JSON.parse(_user) : null);
  }, [setUserState]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
