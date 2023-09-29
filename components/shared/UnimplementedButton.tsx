"use client";
import { Button, ButtonProps } from "@mui/material";
import { NOT_IMPLEMENTED } from "domain/systemMessages";
import { ReactNode } from "react";
import toast from "react-hot-toast";

type Props = ButtonProps & {
  children: ReactNode;
};
export default function UnimplementedButton({ children, ...props }: Props) {
  return (
    <Button onClick={() => toast.error(NOT_IMPLEMENTED)} {...props}>
      {children}
    </Button>
  );
}
