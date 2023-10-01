"use client";
import { useQuery } from "@tanstack/react-query";
import { MenuItemMapCustomCreator } from "./MenuItemMap";
import TextFieldRHF from "./TextFieldRHF";

export default function States({ control }: any) {
  const { data, isInitialLoading } = useQuery({
    queryFn: async () => {
      return (await fetch("/api/geo/states")).json();
    },
    queryKey: ["states"],
  });

  const states = data || [];

  const statesIterator = MenuItemMapCustomCreator("codEstado", "nome");

  return (
    <TextFieldRHF
      control={control}
      name="endereco.codEstado"
      label="Estado"
      required
      sx={{ gridColumn: "span 3" }}
      select
      loading={isInitialLoading}
    >
      {states.map(statesIterator)}
    </TextFieldRHF>
  );
}
