import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "test@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials,req) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usuarios`,
          {
            email: credentials?.email,
            password: credentials?.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = res.data;
        console.log(user);

        if (user.error) throw user;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token ;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };