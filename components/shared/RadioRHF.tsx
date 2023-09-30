import { SxProps, Theme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ChangeEvent, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import { RadioRHFProps } from "./RHFInterfaces";

export default function RadioRHF<T extends FieldValues>(
  props: RadioRHFProps<T>,
) {
  const {
    mainLabel,
    required,
    options,
    name,
    control,
    sx,
    row,
    margin,
    disabled,
    onChangeAction,
    changeSx,
    onChangeInterceptor,
  } = props;
  const {
    field: { onChange, ...fields },
    fieldState: { error },
  } = useController({ name, control });
  const initialSx = sx ? sx : {};
  const [sxValue, setSxValue] = useState<SxProps<Theme>>(initialSx);

  const handleOnChange = (
    _event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    onChangeAction?.(value, fields.value);
    if (onChangeInterceptor) {
      onChangeInterceptor(onChange, value, fields.value);
    } else {
      onChange(value);
    }
    changeSx &&
      setSxValue({
        ...sx,
        ...changeSx(value),
      });
  };

  return (
    <FormControl
      component="fieldset"
      required={Boolean(required)}
      margin={margin}
      sx={{ ...sxValue }}
      error={!!error}
      disabled={disabled}
    >
      {mainLabel && (
        <FormLabel aria-label={props?.["aria-label"]}>{mainLabel}</FormLabel>
      )}
      <RadioGroup
        {...fields}
        onChange={handleOnChange}
        row={row}
        aria-label={mainLabel}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {options.map(({ value, label }) => {
          return (
            <FormControlLabel
              key={value + label}
              value={value}
              control={<Radio required={Boolean(required)} />}
              label={label}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText>{error ? error?.message : " "}</FormHelperText>
    </FormControl>
  );
}
