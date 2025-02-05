import { api } from '@/constants/api';
import http from '@/lib/http';
import type { Comment } from '@/types/comment.type';

const commentService = {
  getByRoomId: async (
    roomId: number | string
  ): Promise<EntitySuccessPayload<Comment[]>> => {
    const data = await http.get<EntitySuccessPayload<Comment[]>>(
      api.comment.getByRoomId(roomId)
    );
    return data.payload;
  },
};

export default commentService;
