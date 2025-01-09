import { KEY } from '@/constants/key';
import { setCookie } from '@/lib/cookies';
import type { LogInResponse } from '@/types/auth.type';

export async function POST(request: Request) {
  const res: LogInResponse = await request.json();
  const { token, user } = res;

  setCookie(KEY.TOKEN, token);
  setCookie(KEY.ROLE, user.role);
  setCookie(KEY.USER, JSON.stringify(user));

  return new Response(
    JSON.stringify({
      statusCode: 200,
      message: 'Completed set token and role to cookie',
      dateTime: new Date().toString(),
    }),
    {
      status: 200,
      statusText: 'OK',
    }
  );
}
