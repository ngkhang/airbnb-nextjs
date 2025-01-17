/**
 * Possible user roles in the application
 */
export type UserRole = 'USER' | 'ADMIN';

/**
 * User entity interface representing user data
 */
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  birthday?: string;
  avatar?: string;
  gender: boolean;
  role: UserRole;
}

export interface LoginResType {
  user: User;
  token: string;
}
