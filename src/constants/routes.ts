/**
 * Application route definitions
 */
const ROUTES = {
  HOME: '/',
  NOT_FOUND: '/not-found',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  USER: {
    DASHBOARD: '/users/show',
    PROFILE: '/users/show/profile-info',
  },
  ROOM: {
    LOCATION: '/rooms/location',
  },
} as const;

export default ROUTES;
