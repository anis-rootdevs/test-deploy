import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { routes } from "@/config/routes";
// Helper to safely read environment variables
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`❌ Missing environment variable: ${key}`);
  return value;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        return credentials;
      },
    }),
  ],

  // Type-safe environment variable
  secret: getEnvVar("NEXTAUTH_SECRET"),

  pages: {
    signIn: routes.publicRoutes.adminLogin,
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user?.token) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ token }: any) {
      return {
        token: token.accessToken,
        expires: token.exp,
      };
    },
  },
});
