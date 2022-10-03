import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import CredentialsProvider from 'next-auth/providers/credentials'

import bcrypt from 'bcrypt'
import UserModel from 'models/User'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        if (!credentials) throw new Error('no credentials');
        const username = credentials.username;
        const email = credentials.email;
        const password = credentials.password;
        const user = await UserModel.findOne({ email }) ?? await UserModel.findOne({ username })
        if (!user) throw new Error('NO USER FOUND')
        if (!password) throw new Error("Please enter password")
        if (!(await bcrypt.compare(password, user.password))) throw new Error("Password Incorrect.");
        return user;
      }
    }),
    GithubProvider({
      authorization: { params: { scope: "user"} },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV !== "production",
  secret: process.env.NEXTAUTH_AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.provider === 'github') {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  }
})