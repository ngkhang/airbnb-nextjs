import { api } from '@/constants/api';
import http from '@/lib/http';
import type { UpdateProfileType } from '@/schemas/user.schema';
import type { User } from '@/types/user.type';

const userService = {
  uploadAvatar: async (file: File): Promise<EntitySuccessPayload<User>> => {
    const formData = new FormData();
    formData.append('formFile', file);

    const data = await http.post<EntitySuccessPayload<User>>(
      api.users.uploadAvatar,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data.payload;
  },
  updateProfile: async (
    body: UpdateProfileType,
    userId: string | number
  ): Promise<EntitySuccessPayload<User>> => {
    const convertBody = {
      ...body,
      gender: body.gender === 'Male',
    };
    const data = await http.put<EntitySuccessPayload<User>>(
      api.users.updateProfile(userId),
      convertBody
    );
    return data.payload;
  },
};

export default userService;
