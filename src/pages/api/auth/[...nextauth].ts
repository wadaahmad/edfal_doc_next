import NextAuth, { NextAuthOptions, DefaultSession, OauthToken, UserDetail } from "next-auth"
const baseUrl = process.env.EDFAL_API_URL

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "EDCR",
      name: "Credential",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials && process.env.EDFAL_CLIENT_ID && process.env.EDFAL_CLIENT_SECRET) {
          credentials.client_id = process.env.EDFAL_CLIENT_ID
          credentials.client_secret = process.env.EDFAL_CLIENT_SECRET
          credentials.grant_type = 'password'
        }
        const res = await fetch(`${baseUrl}oauth/token`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const token = await res.json()

        // If no error and we have user data, return it
        if (res.ok && token) {
          const getUser = await fetch(`${baseUrl}/user`, {
            method: 'GET',
            headers: { "Authorization": `Bearer ${token.access_token}` }
          })
          const user = await getUser.json()
          if (getUser.ok && user) {
            return {
              id: user.data.id,
              name: user.data.name,
              email: user.data.email,
              image: user.data.photo,
              token: token
            }
          }
        }
        // Return null if user data could not be retrieved
        return null
      }

    }
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      session.token = token.token as OauthToken
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.token = user.token
      }
      return token
    }

  }
}
export default NextAuth(authOptions)