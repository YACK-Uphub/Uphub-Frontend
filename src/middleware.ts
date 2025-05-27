import {NextRequest, NextResponse} from "next/server";

const redirects: Record<string, string> = {
	'/school': '/school/students',
	'/admin': '/admin/accounts',
	'/enterprise': '/enterprise/candidates',
	'/student': '/student/jobs',
};

export function middleware(request: NextRequest) {

	const path = request.nextUrl.pathname.replace(/\/$/, ''); // remove trailing slash
	const redirectTo = redirects[path];

	if (redirectTo) {
		return NextResponse.redirect(new URL(redirectTo, request.url));
	}

	return NextResponse.next();
}
