import { KEY } from '@/constants/key';
import { removeCookie } from '@/lib/cookies';
import { EntityError } from '@/lib/http';

export async function POST(request: Request) {
  try {
    // Call Api Logout of Cybersoft server if have
    // Delete token and role in cookie
    removeCookie(KEY.TOKEN);
    removeCookie(KEY.ROLE);

    return new Response(
      JSON.stringify({
        statusCode: 200,
        message: 'Deleted token and role in cookie',
        dateTime: new Date().toString(),
      }),
      {
        status: 200,
        statusText: 'OK',
      }
    );
  } catch (error) {
    if (error instanceof EntityError) {
      return new Response(
        JSON.stringify({
          statusCode: 500,
          message: 'Somethings wrong',
          dateTime: new Date().toString(),
        }),
        {
          status: 500,
        }
      );
    }
  }
}
