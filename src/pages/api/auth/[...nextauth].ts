import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import UserModel from "src/models/User";
import connectdb from "src/lib/connectDB";
import type { IUserDocument } from "src/models/User";

// connect to mongo db
connectdb();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials) throw new Error("no credentials");
        const { username, email, password } = credentials;
        const user: IUserDocument | null = email
          ? await UserModel.findOne({ email })
          : username
          ? await UserModel.findOne({ username })
          : null;
        if (!user) throw new Error("NO USER FOUND");
        if (!password) throw new Error("Please enter password");
        if (!(await bcrypt.compare(password, user.password)))
          throw new Error("Password Incorrect.");
        return {
          id: user.id,
          name: user.username,
          email: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.username)
            ? user.username
            : null,
        };
      },
    }),
    GithubProvider({
      authorization: { params: { scope: "user" } },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/login",
  },
  debug: process.env.NODE_ENV !== "production",
  secret: process.env.NEXTAUTH_AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
