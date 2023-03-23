import NextAuth from "next-auth"
import CredentialsProvider, { CredentialInput } from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

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
        async signIn(user: User, account, profile) {
          const userFromDB = await prisma.user.findUnique({ where: { email: user.email } });
          return { id: userFromDB?.id.toString(), name: userFromDB?.name, email: userFromDB?.email };
        }
      },

      async authorize(credentials: Credentials, req) {

        const { email, password } = Object.fromEntries(
          Object.entries(credentials).filter(([key]) =>
            ['email', 'password'].includes(key)
          )
        );

        console.log('Email:', email); // Verifica o valor do campo `email`
        console.log('Password:', password); // Verifica o valor do campo `password`

        const userWithPassword = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            email: true,
            password: true,
            name: true
          }
        });

        if (!userWithPassword || userWithPassword.password !== password) {
          throw new Error("Invalid email or password.");
        }

        return userWithPassword;
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
