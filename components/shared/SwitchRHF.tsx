import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { SyntheticEvent } from "react";
import { useController } from "react-hook-form";
import { SwitchRHFProps } from "./RHFInterfaces";

export default function SwitchRHF<T extends { [x: string]: any }>(
  props: SwitchRHFProps<T>,
) {
  const {
    name,
    control,
    label,
    labelPlacement,
    sx,
    onChangeAction,
    disabled,
    onChangeInterceptor,
  } = props;
  const { field } = useController({ name, control });
  const { value, onChange } = field;

  const onChangePropagator = (event: SyntheticEvent, checked: boolean) => {
    onChangeAction?.(checked);
    if (onChangeInterceptor) {
      onChangeInterceptor(onChange, checked);
    } else {
      onChange(event, checked);
    }
  };

  return (
    <Box sx={sx}>
      <FormControlLabel
        control={<Switch />}
        {...field}
        onChange={onChangePropagator}
        checked={value}
        disabled={disabled}
        label={label}
        labelPlacement={labelPlacement}
        sx={{ alignItems: "baseline" }}
      />
    </Box>
  );
}
