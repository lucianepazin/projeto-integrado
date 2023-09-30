"use client";
import TextFieldRHF from "@/components/shared/TextFieldRHF";
import yup from "@/components/shared/yupTranslation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

export default function Ong() {
  /*
        
      nome: "Pessoa Adotante",
      CPF: "67347164060",
      codEndereco: 1,
      telefone: "123456789",
      celular: "123456789",
   */
  const { control, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      senha: "",
      nomeONG: "",
      CNPJ: "",
      nomeResp: "",
      CPFResp: "",
      telefone: "",

      endereco: {
        logradouro: "",
        numero: "",
        bairro: "",
        complemento: "",
        CEP: "",
        codCidade: null as number | null,
        codEstado: null as number | null,
      },
    },
    resolver: yupResolver(
      yup
        .object({
          email: yup.string().email().required(),
          senha: yup.string().min(6).required(),
          nomeONG: yup.string().required(),
          CNPJ: yup.string().required(),
          nomeResp: yup.string().required(),
          CPFResp: yup.string().required(),
          telefone: yup.string().required(),

          endereco: yup.object({
            logradouro: yup.string().required(),
            numero: yup.string().required(),
            bairro: yup.string().required(),
            complemento: yup.string().required(),
            CEP: yup.string().required(),
            codCidade: yup.number().required().nullable(),
            codEstado: yup.number().required().nullable(),
          }),
        })
        .required(),
    ),
  });

  const onValidSubmit: SubmitHandler<typeof control._defaultValues> = async (
    formFields,
  ) => {
    console.log(formFields);
  };

  const onInvalidSubmit: SubmitErrorHandler<
    typeof control._defaultValues
  > = async (formErrors) => {
    console.log(formErrors);
  };

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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        columnGap: 2,
        rowGap: 2,
      }}
    >
      {/* <RadioRHF
        name="isONG"
        required
        control={control}
        row
        options={[
          { label: "Tenho interesse em adotar", value: false },
          { label: "Quero divulgar animais para adoção", value: true },
        ]}
        sx={{ gridColumn: "span 6" }}
      /> */}
      <TextFieldRHF
        control={control}
        name="email"
        label="Email"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <TextFieldRHF
        control={control}
        type="password"
        name="senha"
        label="Senha"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <TextFieldRHF
        control={control}
        name="nomeONG"
        label="Nome da ONG"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <TextFieldRHF
        control={control}
        name="CNPJ"
        label="CNPJ"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <TextFieldRHF
        control={control}
        name="nomeResp"
        label="Nome do Responsável"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <TextFieldRHF
        control={control}
        name="CPFResp"
        label="CPF do Responsável"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <TextFieldRHF
        control={control}
        name="telefone"
        label="Telefone"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <Typography variant="h5" sx={{ gridColumn: "span 6" }}>
        Endereço
      </Typography>
      <TextFieldRHF
        control={control}
        name="endereco.logradouro"
        label="Logradouro"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <TextFieldRHF
        control={control}
        name="endereco.numero"
        label="Número"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <TextFieldRHF
        control={control}
        name="endereco.bairro"
        label="Bairro"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <TextFieldRHF
        control={control}
        name="endereco.complemento"
        label="Complemento"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <TextFieldRHF
        control={control}
        name="endereco.CEP"
        label="CEP"
        required
        sx={{ gridColumn: "span 3" }}
      />
      <Box
        sx={{
          gridColumn: "span 6",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
}
