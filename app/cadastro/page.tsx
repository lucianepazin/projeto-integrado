"use client";
import RadioRHF from "@/components/shared/RadioRHF";
import yup from "@/components/shared/yupTranslation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Typography } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import Ong from "./Ong";

export default function Page() {
  /*
        
      nome: "Pessoa Adotante",
      CPF: "67347164060",
      codEndereco: 1,
      telefone: "123456789",
      celular: "123456789",
   */
  const { control } = useForm({
    mode: "onBlur",
    defaultValues: {
      isONG: false,
    },
    resolver: yupResolver(
      yup.object({
        isONG: yup.boolean().required(),
      }),
    ),
  });

  // fetch("/api/auth/register", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     email: event.currentTarget.email.value,
  //     password: event.currentTarget.password.value,
  //   }),
  // }).then(async (res) => {
  //   setLoading(false);
  //   if (res.status === 200) {
  //     toast.success("Account created! Redirecting to login...");
  //     setTimeout(() => {
  //       router.push("/login");
  //     }, 2000);
  //   } else {
  //     const { error } = await res.json();
  //     toast.error(error);
  //   }
  // });
  const isONG = useWatch({ control, name: "isONG" });
  return (
    <Container>
      <Typography variant="h4" sx={{ gridColumn: "span 6" }}>
        Cadastro de usuário
      </Typography>
      <RadioRHF
        name="isONG"
        required
        control={control}
        row
        options={[
          { label: "Tenho interesse em adotar", value: false },
          { label: "Quero divulgar animais para adoção", value: true },
        ]}
      />
      {isONG ? <Ong /> : <> </>}
    </Container>
  );
}
