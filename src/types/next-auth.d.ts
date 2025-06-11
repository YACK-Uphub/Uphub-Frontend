import {type DefaultSession} from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			username: string;
			role: string;
			userId: string;
		} & DefaultSession["user"];
		accessToken: string;
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
		username: string;
		role: string;
		userId: string;
		accessToken: string;
	}
}
