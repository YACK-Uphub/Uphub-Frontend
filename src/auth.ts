import NextAuth, { Profile } from "next-auth";
import { OIDCConfig } from "next-auth/providers";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: {
		strategy: "jwt",
	},
	providers: [
		DuendeIDS6Provider({
			id: "id-server",
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			issuer: process.env.ID_URL,
			authorization: { params: { scope: process.env.SCOPE } },
			idToken: true,
		} as OIDCConfig<Omit<Profile, "username">>),
	],
	callbacks: {
		async authorized({ auth }) {
			return !!auth;
		},
		async jwt({ token, profile, account }) {
			if (account && account.access_token) {
				token.accessToken = account.access_token;
			}
			if (profile) {
				token.username = profile.username;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.username = token.username;
				session.accessToken = token.accessToken;
			}
			return session;
		},
	},
});
