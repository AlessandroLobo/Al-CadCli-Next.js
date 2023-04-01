import NextAuth from "next-auth"
import CredentialsProvider, { CredentialInput } from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { User, Account, Profile } from "next-auth";
import { setCookie } from 'nookies';


const prisma = new PrismaClient();

interface Credentials extends CredentialInput {
  email: string;
  password: string;
}

declare module "next-auth" {
  interface User {
    name?: string;
    email: string;
  }
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // Sessão expira em 30 dias
  },
  providers: [
    CredentialsProvider({
      name: "NextAuthCredentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      callbacks: {
        callbacks: {
          async signIn(user: User, account: Account, profile: Profile) {
            const userFromDB = await prisma.user.findUnique({ where: { email: user.email } });
            return {
              id: userFromDB?.id.toString(),
              name: userFromDB?.name,
              email: userFromDB?.email
            };
          },

          async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
              token.accessToken = account.access_token
            }
            return token
          },
          async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
          }
        }
      },

      async authorize(credentials: Credentials, req: any) {
        const { email, password } = credentials;

        const userWithPassword = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
          },
        });

        if (!userWithPassword || userWithPassword.password !== password) {
          throw new Error("Invalid email or password.");
        }

        return {
          id: userWithPassword.id.toString(),
          name: userWithPassword.name ?? undefined,
          email: userWithPassword.email,
          session: {
            userId: userWithPassword.id
          }
        }
      }


    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),

  ],
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },

})
