/* eslint-disable no-undefined */
'use client';

import type { DateRange } from 'react-day-picker';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Guest {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

// 1. Define state and action type in store
interface SearchState {
  location: {
    id: number | string;
    title: string;
  };
  dateRange?: DateRange;
  guests: Guest;
}

interface SearchActions {
  updateGuest: <K extends keyof Guest>(type: K, value: number) => void;
  updateLocation: (id: number | string, title: string) => void;
  updateDate: (dateRange?: DateRange) => void;
}

// 2. Create initial state
const initialState: SearchState = {
  dateRange: undefined,
  location: {
    id: 0,
    title: '',
  },
  guests: {
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  },
};

// 3. Create store and custom hook
export const useSearchStore = create<SearchState & SearchActions>()(
  devtools(
    (set) => {
      return {
        // Initial state
        ...initialState,

        // Actions
        updateGuest: (type, value) =>
          set(
            (state) => {
              return {
                guests: { ...state.guests, [type]: state.guests[type] + value },
              };
            },
            false,
            'search/guest'
          ),

        updateLocation: (id, title) =>
          set(
            () => {
              return {
                location: {
                  id,
                  title,
                },
              };
            },
            false,
            'search/location'
          ),
        updateDate: (date) =>
          set(
            () => {
              return {
                dateRange: date,
              };
            },
            false,
            'search/date'
          ),
      };
    },
    {
      name: 'search-storage',
    }
  )
);
