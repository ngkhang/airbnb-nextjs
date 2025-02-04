export const api = {
  auth: {
    login: '/auth/signin',
    register: '/auth/signup',
  },
  users: {
    getAll: '/users',
    getById: (userId: number | string) => `/users/${userId}`,
    uploadAvatar: '/users/upload-avatar',
    updateProfile: (userId: number | string) => `/users/${userId}`,
    delete: (userId: number | string) => `users?id=${userId}`,
  },
  rooms: {
    getAll: '/phong-thue',
    getById: (roomId: number | string) => `/phong-thue/${roomId}`,
    getByLocationId: (locationId: number | string) =>
      `/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`,
    getPagination: (pageIndex: number, pageSize: number) =>
      `/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    add: '/phong-thue',
    delete: '/phong-thue',
  },
  location: {
    getAll: '/vi-tri',
    getById: (locationId: number | string) => `/vi-tri/${locationId}`,
    create: '/vi-tri',
    delete: (locationId: number | string) => `vi-tri/${locationId}`,
  },
  booking: {
    getByUserId: (userId: number | string) =>
      `/dat-phong/lay-theo-nguoi-dung/${userId}`,
  },
  nextServer: {
    login: 'auth/login',
    logout: 'auth/logout',
  },
};
