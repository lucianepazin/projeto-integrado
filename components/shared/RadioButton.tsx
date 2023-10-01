import { SxProps, Theme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ChangeEvent } from "react";

interface Option {
  label: string;
  value: string | boolean;
}

export interface RadioButtonProps {
  "aria-label"?: string;
  mainLabel?: string;
  options: Option[];
  row?: boolean;
  margin?: "none" | "normal" | "dense";
  onChangeAction: (value: any) => void;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export default function RadioButton(props: RadioButtonProps) {
  const {
    mainLabel,
    required,
    options,
    sx,
    row,
    margin,
    disabled,
    onChangeAction,
  } = props;
  const handleOnChange = (
    _event: ChangeEvent<HTMLInputElement>,
    value: any,
  ) => {
    onChangeAction(value);
  };

  return (
    <FormControl
      component="fieldset"
      required={Boolean(required)}
      margin={margin}
      sx={sx}
      disabled={disabled}
    >
      {mainLabel && (
        <FormLabel aria-label={props?.["aria-label"]}>{mainLabel}</FormLabel>
      )}
      <RadioGroup
        onChange={handleOnChange}
        row={row}
        aria-label={mainLabel}
        sx={{ display: "flex", alignItems: "center" }}
        defaultValue={options[0].value}
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
      {/* <FormHelperText>{error ? error?.message : " "}</FormHelperText> */}
    </FormControl>
  );
}
