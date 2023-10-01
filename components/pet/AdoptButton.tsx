"use client";

import { Backdrop, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { LoginModalCtx } from "../login/LoginModalProvider";
export default function AdoptButton({ codPet }: { codPet: number }) {
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const { status } = useSession();
  const { handleOpenLogin } = useContext(LoginModalCtx);

  const { data: interested, isInitialLoading } = useQuery({
    queryFn: async ({ signal }) => {
      const interesse = await fetch(`/api/pets/${codPet}/interesse`, {
        signal,
      });
      return interesse.ok;
    },
    queryKey: ["interesse", status],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: status === "authenticated",
  });

  const handleClickOpen = async () => {
    if (status === "authenticated") {
      setBackdrop(true);
      fetch(`/api/pets/${codPet}/interesse`, {
        method: "POST",
      })
        .then(async (res) => {
          //verificar se deu certo
          if (res.ok) {
            setOpen(true);
          } else {
            const responseJson = await res.json();
            responseJson?.message && toast.error(responseJson.message);
          }
        })
        .catch((e: Error) => toast.error(e.message))
        .finally(() => setBackdrop(false));
    } else {
      handleOpenLogin();
    }
  };

  const handleClose = () => setOpen(false);

  function buttonText() {
    if (interested) return "Interesse enviado";
    if (isInitialLoading) return "Carregando...";
    return "Quero ADOTAR";
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        disabled={status === "authenticated" && isInitialLoading}
      >
        {buttonText()}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="primary">
          Parabéns!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Comunicamos seu interesse de adoção para ONG responsável.
            <br />
            Aguarde o contato :)
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Backdrop
        sx={{
          color: (theme) => theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={backdrop}
        onClick={() => setBackdrop(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
