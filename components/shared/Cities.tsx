"use client";

import { useQuery } from "@tanstack/react-query";
import { useWatch } from "react-hook-form";
import { MenuItemMapCustomCreator } from "./MenuItemMap";
import TextFieldRHF from "./TextFieldRHF";

export default function Cities({ control }: any) {
  const state = useWatch({ control, name: "endereco.codEstado" });

  const citiesIterator = MenuItemMapCustomCreator("codCidade", "nome");
  const { data, isInitialLoading } = useQuery({
    queryFn: async () => {
      return (
        await fetch("/api/geo/cities?codEstado=" + state, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
    },
    queryKey: ["cities", state],
    enabled: !!state,
  });

  const cities = data || [];

  return (
    <TextFieldRHF
      control={control}
      name="endereco.codCidade"
      label="Cidade"
      required
      sx={{ gridColumn: "span 3" }}
      select
      loading={isInitialLoading}
    >
      {cities.map(citiesIterator)}
    </TextFieldRHF>
  );
}
