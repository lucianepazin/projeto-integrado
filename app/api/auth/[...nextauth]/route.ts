import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        //TODO: get name from pessoa associated
        const user = await prisma.usuario.findUnique({
          where: {
            email: email.toLowerCase(),
          },
          include: {
            PessoaAdotante: true,
            pessoaONG: true,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.senha))) {
          throw new Error("Invalid username or password");
        }
        const { senha, ...usuario } = user;
        return {
          id: user.codUsuario,
          ...usuario,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ account, token, user, profile, session, trigger }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.name = user?.PessoaAdotante?.nome ?? user.pessoaONG?.nomeResp;
        token.role = user?.PessoaAdotante ? "adotante" : "ong";
      }
      return token;
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object */
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
