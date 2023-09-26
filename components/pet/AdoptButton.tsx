"use client";

import { Backdrop, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { LoginModalCtx } from "../login/LoginModalProvider";

export default function AdoptButton({ codPet }: { codPet: number }) {
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const { status } = useSession();
  const { handleOpenLogin } = useContext(LoginModalCtx);

  const handleClickOpen = async () => {
    setBackdrop(true);
    if (status === "authenticated") {
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

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Quero ADOTAR
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
