import type { User, UserRole } from './user.type';

export interface LogInForm {
  email: string;
  password: string;
}

export type LogInResponse = ActionResponse<{ user: User; token: string }>;

export interface RegisterForm {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

export type RegisterResponse = ActionResponse<User>;
