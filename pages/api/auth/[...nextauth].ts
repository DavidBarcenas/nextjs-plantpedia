import NextAuth, { NextAuthOptions } from "next-auth"
import Providers from "next-auth/providers"

const options: NextAuthOptions = {
  theme: 'light',
  debug: true,
  session: {},
  jwt: {},
  providers: [
    Providers.Credentials({
      name: 'Plantpedia',
      credentials: {
        username: {
          type: 'text',
          label: 'Username'
        },
        password: {
          type: 'password',
          label: 'Password'
        }
      },
      async authorize(credentials) {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/plantpedia`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-type': 'application/json' }
        })

        const user = await response.json()

        if(response.ok && user) {
          return user
        }

        return null
      }
    }),
    Providers.GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ]
}

export default NextAuth(options)