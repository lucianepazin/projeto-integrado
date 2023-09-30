import { Box, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FocusEvent } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TextFieldRHFProps } from "./RHFInterfaces";

export default function TextFieldRHF<T extends FieldValues>(
  props: TextFieldRHFProps<T>,
) {
  const {
    required,
    name,
    control,
    sx,
    children,
    disabled,
    helperText,
    onBlurAction,
    onChangeAction,
    onFocusAction,
    defaultValue,
    customError,
    loading,
    select,
    ...rest
  } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });
  const { ref, onBlur, onChange, value, ...otheProps } = field;

  const onBlurPropagator = (event: FocusEvent<HTMLInputElement>) => {
    onBlur();
    onBlurAction?.(event);
  };

  const onChangePropagator = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
    onChangeAction?.(event.target.value);
  };

  return (
    <TextField
      {...otheProps}
      value={value ?? ""}
      onBlur={onBlurPropagator}
      onChange={onChangePropagator}
      onFocus={onFocusAction}
      inputRef={ref}
      error={!!error || customError}
      helperText={error?.message || helperText}
      FormHelperTextProps={{ "aria-live": !!error ? "polite" : "off" }}
      required={Boolean(required)}
      disabled={disabled}
      select={select}
      inputProps={{ "aria-disabled": disabled }}
      InputProps={{
        endAdornment: loading && (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              right: select ? "30px" : 0,
            }}
          >
            <CircularProgress size="1.3rem" />
          </Box>
        ),
      }}
      sx={sx}
      {...rest}
    >
      {children}
    </TextField>
  );
}
