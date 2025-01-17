import type { LoginResType, User } from './user.type';

export interface LoginServiceRes extends EntitySuccessPayload<LoginResType> {}

export interface RegisterServiceRes extends EntitySuccessPayload<User> {}
