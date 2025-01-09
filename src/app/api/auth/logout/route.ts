import { KEY } from '@/constants/key';
import { removeCookie } from '@/lib/cookies';

export async function POST(request: Request) {
  removeCookie(KEY.TOKEN);
  removeCookie(KEY.ROLE);
  removeCookie(KEY.USER);

  return new Response(
    JSON.stringify({
      statusCode: 200,
      message: 'Deleted token and role to cookie',
      dateTime: new Date().toString(),
    }),
    {
      status: 200,
      statusText: 'OK',
    }
  );
}
