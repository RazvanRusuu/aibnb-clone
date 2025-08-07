import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/libs/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      credentials: {
        username: { label: "Name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        throw new Error();
      },
    }),
  ],
});
