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
        const { username, email, password } = { ...credentials };
        const user = await UserModel.findOne({ email })
        if (!user) {
          throw new Error("You haven't registered yet")
        }
        if (user) return signinUser({ password: password as string, user })
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH__SECRET as string,
  jwt: {
    secret: process.env.JWT_SECRET as string,
  }
})

const signinUser: (user: { password: string, user: any }) => Promise<any> = async ({ password, user }) => {
  if (!user.password) throw new Error("Please enter password")
  if (!(await bcrypt.compare(password, user.password))) throw new Error("Password Incorrect.");
  return user;
}