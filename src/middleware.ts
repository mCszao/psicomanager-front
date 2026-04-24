import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // authToken is an HttpOnly cookie set by the backend — readable here server-side
    const token = request.cookies.get('authToken');
    const isLoginPage = request.nextUrl.pathname === '/login';

    if (!token && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon).*)'],
}
