import { KEY } from '@/constants/key';
import { setCookie } from '@/lib/cookies';
import type { LoginResType } from '@/types/user.type';

// TODO: Config type response of next server
export async function POST(request: Request) {
  const res: LoginResType = await request.json();

  const { user, token } = res;

  if (!token || !user) {
    return Response.json(
      {
        message: 'token or user info is not valid',
        dateTime: new Date().toString(),
      },
      {
        status: 400,
      }
    );
  }
  setCookie(KEY.TOKEN, token);
  setCookie(KEY.ROLE, user.role);
  return Response.json(
    {
      ...res,
      message: 'Completed set token and role to cookie',
      dateTime: new Date().toString(),
    },
    {
      status: 200,
    }
  );
}
