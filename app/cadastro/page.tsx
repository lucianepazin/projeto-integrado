"use client";
import Adotante from "@/components/shared/Adotante";
import Ong from "@/components/shared/Ong";
import RadioButton from "@/components/shared/RadioButton";
import { Container, Typography } from "@mui/material";
import { useState } from "react";

export default function Page() {
  const [isONG, setONG] = useState(false);
  return (
    <Container>
      <Typography variant="h4" sx={{ gridColumn: "span 6" }}>
        Cadastro de usuário
      </Typography>
      <RadioButton
        required
        row
        options={[
          { label: "Tenho interesse em adotar", value: "" },
          { label: "Quero divulgar animais para adoção", value: "true" },
        ]}
        onChangeAction={(value) => setONG(Boolean(value))}
        sx={{ my: 2 }}
      />
      {isONG ? <Ong /> : <Adotante />}
    </Container>
  );
}
