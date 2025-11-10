import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { routes } from "./config/routes";

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
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        //  Static example (replace later with DB lookup)
        if (email === "admin@demo.com" && password === "123456") {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@demo.com",
          };
        }

        return null;
      },
    }),
  ],

  // Type-safe environment variable
  secret: getEnvVar("NEXTAUTH_SECRET"),

  pages: {
    signIn: routes.publicRoutes.adminLogin,
  },

  callbacks: {
    async session({ session, token }) {
      // Safely attach extra info to the session
      session.user = {
        ...session.user,
        id: token.sub ?? "",
      };
      return session;
    },
  },
});

/**
 * 
import { db } from "@/lib/db";

const user = await db.user.findUnique({ where: { email } });

if (user && user.password === hash(password)) {
  return user;
}
return null; 

 * 
 */
