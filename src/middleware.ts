import { NextResponse, type NextRequest } from 'next/server';

import { KEY } from '@/constants/key';
import ROUTES from '@/constants/routes';

// 1. Specify protected and public routes
const protectedPaths = ['/users', '/admin'];
const authPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;

  const isProtectedPath =
    typeof protectedPaths.find((pathProtect) =>
      path.startsWith(pathProtect)
    ) === 'string';
  const isAuthPath = authPaths.includes(path);

  const token = request.cookies.get(KEY.TOKEN)?.value;
  const roleAccount = request.cookies.get('role')?.value;

  // 4. Redirect to Login Page if the account is not login
  if (isProtectedPath && !token)
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.nextUrl));

  // 5. Redirect to User's Dashboard if account is logged
  if (isAuthPath && token)
    return NextResponse.redirect(
      new URL(ROUTES.USER.DASHBOARD, request.nextUrl)
    );

  // NOTE: Role-based access: Account: USER | ADMIN
  if (roleAccount === 'USER' && path.startsWith('/admin')) {
    // TODO: Create forbidden page
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  // 6. Create a new response with headers
  const response = NextResponse.next();
  if (token) response.headers.set(KEY.TOKEN, token);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
