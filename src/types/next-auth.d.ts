import {type DefaultSession} from "next-auth";

declare module "next-auth" {
	interface Session {
		accessToken?: string;
		user: {
			username?: string;
			role?: string;
			userId?: string;
		} & DefaultSession["user"];
	}

	interface Profile {
		username: string;
		role: string;
		userId: string;
	}

	interface User {
		username: string;
		role: string;
		userId: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		username?: string;
		role?: string;
		userId?: string;
		accessToken?: string;
	}
}
