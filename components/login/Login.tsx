"use client";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { NOT_IMPLEMENTED } from "domain/systemMessages";
import { signIn } from "next-auth/react";
import { FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import { LoginModalCtx } from "./LoginModalProvider";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { handleCloseLogin } = useContext(LoginModalCtx);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
      // @ts-ignore
    }).then(({ error }) => {
      if (error) {
        setLoading(false);
        toast.error(error);
      } else {
        handleCloseLogin();
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <>...</> : <>entrar</>}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                onClick={() => toast.error(NOT_IMPLEMENTED)}
              >
                Esqueceu sua senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/cadastro" variant="body2">
                Cadastre-se
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
