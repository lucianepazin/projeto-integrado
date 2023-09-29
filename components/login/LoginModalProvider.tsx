"use client";
import { Dialog, DialogContent } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode, createContext, useState } from "react";
import Login from "./Login";

export const LoginModalCtx = createContext<any>(null);
const queryClient = new QueryClient();

export default function LoginModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  //TODO: receber o texto da mensagem pra aparecer quando for login por tentar adotar
  //TODO: receber callback pra executar quando fechar o modal
  const handleOpenLogin = () => setOpen(true);
  const handleCloseLogin = () => setOpen(false);
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <LoginModalCtx.Provider value={{ handleOpenLogin, handleCloseLogin }}>
          {children}

          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-label="Modal de login"
          >
            <DialogContent>
              <Login />
            </DialogContent>
          </Dialog>
        </LoginModalCtx.Provider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
