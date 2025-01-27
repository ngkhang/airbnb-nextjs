export const api = {
  auth: {
    login: '/auth/signin',
    register: '/auth/signup',
  },
  users: {
    getAll: '/users',
    getById: (userId: number) => `/users/${userId}`,
  },
  rooms: {
    getAll: '/phong-thue',
    getById: (roomId: number) => `/phong-thue/${roomId}`,
    getByLocationId: (locationId: number) =>
      `/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`,
    getPagination: (pageIndex: number, pageSize: number) =>
      `/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    add: '/phong-thue',
    delete: '/phong-thue',
  },
  location: {
    getAll: '/vi-tri',
    getById: (locationId: number) => `/vi-tri/${locationId}`,
  },
  booking: {
    getByUserId: (userId: number) => `/dat-phong/lay-theo-nguoi-dung/${userId}`,
  },
  nextServer: {
    login: 'auth/login',
    logout: 'auth/logout',
  },
};
