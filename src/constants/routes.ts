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
    DETAIL: (roomId: string | number) => `/rooms/${roomId}`,
    LOCATION: (locationId: string | number) =>
      `/rooms/location?locationId=${locationId}`,
  },
} as const;

export default ROUTES;
