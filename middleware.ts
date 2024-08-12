import NextAuth, { Session } from 'next-auth';
import authConfig from './auth.config';
import {
	apiAuthPrefix,
	authRoutes,
	DEFAULT_LOGIN_REDIRECT,
	publicRoutes
} from './routes';
import { NextRequest, NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth(
	(req: NextRequest & { auth: Session | null }): Response | void => {
		const { nextUrl } = req;
		const isLoggedIn = !!req.auth;

		const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
		const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
		const isAuthRoute = authRoutes.includes(nextUrl.pathname);

		if (isApiAuthRoute) {
			return NextResponse.next();
		}

		if (isAuthRoute) {
			if (isLoggedIn) {
				return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
			}
			return NextResponse.next();
		}

		if (!isLoggedIn && !isPublicRoutes) {
			return Response.redirect(new URL('/auth/login', nextUrl));
		}

		return NextResponse.next();
	}
);

export const config = {
	// The following matcher runs middleware on all routes
	// except static assets.
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};

// 	// matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],

// 	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
