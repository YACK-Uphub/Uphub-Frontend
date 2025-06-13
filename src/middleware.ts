import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";

const redirects: Record<string, string> = {
	"/school": "/school/students",
	"/admin": "/admin/accounts",
	"/enterprise": "/enterprise/candidates",
	"/student": "/student/jobs",
};
const protectedPaths = ["/school", "/admin", "/enterprise", "/student/dashboard"];

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname.replace(/\/$/, ""); // remove trailing slash
	const redirectTo = redirects[path];

	if (redirectTo) {
		return NextResponse.redirect(new URL(redirectTo, request.url));
	}

	const isProtected = protectedPaths.some((p) => path === p || path.startsWith(p + "/"));

	if (isProtected) {
		const session = await auth();
		if (!session?.user) {
			const loginUrl = new URL("/api/auth/signin/", request.url);
			loginUrl.searchParams.set("callbackUrl", "/");
			loginUrl.searchParams.set("prompt", "login");
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/school/:path*", "/admin/:path*", "/enterprise/:path*", "/student/dashboard/:path*"],
};
