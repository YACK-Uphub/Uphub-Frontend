import NextAuth, {Profile} from "next-auth";
import {OIDCConfig} from "next-auth/providers";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

export const {handlers, signIn, signOut, auth} = NextAuth({
	session: {
		strategy: "jwt",
	},
	providers: [
		DuendeIDS6Provider({
			id: "id-server",
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			issuer: process.env.ID_URL,

			authorization: {
				params: {scope: process.env.SCOPE},
				url: process.env.ID_URL + '/connect/authorize'
			},
			token: {
				url: `${process.env.ID_URL}/connect/token}`
			},

			userinfo: {
				url: `${process.env.ID_URL}/connect/token}`
			},

			idToken: true,
		} as OIDCConfig<Omit<Profile, "username">>),
	],
	callbacks: {

		async authorized({auth}) {
			return !!auth;
		},

		// JWT
		async jwt({token, profile, account}) {
			if (account && account.access_token) {
				token.accessToken = account.access_token;
			}
			if (profile) {
				token.username = profile.username;
				token.userId = profile.userId;
				token.role = profile.role;
			}
			return token;
		},

		// Session

		async session({session, token}) {
			if (token) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				session.user.username = token.username;

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				session.accessToken = token.accessToken;

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				session.user.userId = token.userId;

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				session.user.role = token.role;
			}

			return session;
		},
	},
});
