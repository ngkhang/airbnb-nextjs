'use client';

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import type { User } from '@/types/user.type';

// 1. Define state and action type in store
interface UserState {
  user: User | null;
}

interface UserActions {
  setUser: (user: User) => void;
  updateUser: (user: Partial<User>) => void;
  deleteUser: () => void;
}

// 2. Create initial state
const initialState: UserState = {
  user: null,
};

// 3. Create store and custom hook
export const useUserStore = create<UserState & UserActions>()(
  devtools(
    persist(
      (set) => {
        return {
          // Initial state
          ...initialState,

          // Actions
          setUser: (user) =>
            set(
              () => {
                return {
                  user,
                };
              },
              false,
              'user/set'
            ),
          updateUser: (user) =>
            set(
              (state) => {
                return {
                  user: state.user ? { ...state.user, ...user } : null,
                };
              },
              false,
              'user/set'
            ),

          deleteUser: () =>
            set(
              () => {
                return { user: null };
              },
              false,
              'user/delete'
            ),
        };
      },
      {
        name: 'user-storage',
      }
    )
  )
);
