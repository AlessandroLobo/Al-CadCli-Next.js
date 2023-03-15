import { v4 as uuidv4 } from 'uuid';
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"



export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "NextAuthCredentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log(credentials)

        // Verifica se as credenciais são válidas
        if (credentials?.email === 'alessandro.lobo@hotmail.com' && credentials.password === 'XFile120777$') {
          // gerar um UUID aleatório para a propriedade `id`
          const id = uuidv4();

          return {
            id,
            name: "Alesandro Lobo",
            email: "alessandro.lobo@hotmail.com",
            image: "https://avatars.githubusercontent.png",
          }
        } else {
          // Credenciais inválidas
          return null;
        }
      }
    }),


    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? '',
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      // @ts-ignore
      scope: "read:user",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),

  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
  },

  pages: {
  },

  callbacks: {
  },

  events: {},

  debug: false,
})