import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { JWT } from 'next-auth/jwt'

interface ExtendedToken extends JWT {
  accessToken?: string
}

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email repo',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }): Promise<ExtendedToken> {
      if (account) {
        token.accessToken = account.access_token
      }
      return token as ExtendedToken
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: (token as ExtendedToken).accessToken,
      }
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: false,
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
      },
    },
  },
}
