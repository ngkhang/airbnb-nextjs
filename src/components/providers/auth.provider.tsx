'use client';

import React, { createContext, useContext, useState } from 'react';

import type { User } from '@/types/user.type';

interface Account {
  user: User | null;
  token?: string;
}
interface AuthContextProps {
  account: Account;
  setAccount: (account: Account) => void;
}

const AuthContext = createContext<AuthContextProps>({
  account: {
    token: '',
    user: null,
  },
  setAccount: (account) => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};

export default function AuthProvider({
  initialState = {
    token: '',
    user: null,
  },
  children,
}: {
  initialState: Account;
  children: React.ReactNode;
}) {
  const [account, setAccount] = useState<Account>({
    ...initialState,
  });

  return (
    <AuthContext.Provider value={{ account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
