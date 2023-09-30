import { SxProps, Theme } from "@mui/material";
import { StandardTextFieldProps } from "@mui/material/TextField";
import { FocusEvent, ReactNode } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

export interface BaseRHFProps<T extends FieldValues = FieldValues>
  extends Partial<UseControllerProps<T>> {
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  sx?: SxProps<Theme>;
  children?: ReactNode;
  setValue?: UseFormSetValue<T>;
  trigger?: UseFormTrigger<T>;
  control: Control<T>;
}

export interface SwitchRHFProps<T extends FieldValues>
  extends TextFieldRHFProps<T> {
  labelPlacement?: "bottom" | "end" | "start" | "top";
  onChangeAction?: (value?: boolean | string) => void;
  onChangeInterceptor?: (
    onChange: (...event: any[]) => void,
    value?: boolean | string,
  ) => void;
}
export interface TextFieldRHFProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues>,
    Omit<StandardTextFieldProps, "defaultValue" | "sx" | "name"> {
  name: TName;
  label?: string;
  select?: boolean;
  type?: string;
  rows?: number;
  helperText?: string;
  onBlurAction?: (event: FocusEvent<HTMLInputElement>) => void;
  onChangeAction?: (value: any) => void;
  onFocusAction?: () => void;
  fullWidth?: boolean;
  InputProps?: Object;
  customError?: boolean;
  loading?: boolean;
}

export interface RadioRHFProps<T extends FieldValues>
  extends PartiallyRequired<BaseRHFProps<T>, "name"> {
  "aria-label"?: string;
  mainLabel?: string;
  options: (
    | {
        label: string;
        value: string;
      }
    | {
        label: string;
        value: boolean;
      }
  )[];
  row?: boolean;
  margin?: "none" | "normal" | "dense";
  changeSx?: (value: string) => {};
  onChangeAction?: (value?: any, oldValue?: any) => void;
  onChangeInterceptor?: (
    onChange: (...event: any[]) => void,
    value?: any,
    oldValue?: any,
  ) => void;
}

type PartiallyRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
