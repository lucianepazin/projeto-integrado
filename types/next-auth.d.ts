import { PessoaAdotante, PessoaONG } from "@prisma/client";
import "next-auth";
import { DefaultSession } from "next-auth";

type usuario = DefaultSession["user"] & {
  PessoaAdotante: PessoaAdotante | null;
  pessoaONG: PessoaONG | null;
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "adotante" | "ong";
    };
  }
  interface User extends usuario {}
}
declare module "next-auth/jwt" {
  interface JWT extends usuario {}
}
