"use client";

import { Box, Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import UnimplementedButton from "../shared/UnimplementedButton";
import { LoginModalCtx } from "./LoginModalProvider";

export default function LoginRegisterButtons() {
  const { data: session, status } = useSession();
  const { handleOpenLogin } = useContext(LoginModalCtx);

  if (status === "authenticated") {
    return (
      <Box>
        <Button variant="outlined" onClick={() => signOut()}>
          Logout
        </Button>
        <UnimplementedButton variant="contained" sx={{ ml: 2 }}>
          Minha conta
        </UnimplementedButton>
      </Box>
    );
  }
  return (
    <Box>
      <Button variant="outlined" onClick={handleOpenLogin}>
        Login
      </Button>
      <Button variant="contained" sx={{ ml: 2 }}>
        Cadastre-se
      </Button>
    </Box>
  );
}
