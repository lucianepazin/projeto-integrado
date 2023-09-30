import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#C87FD3",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#8D8BA7",
    },
    text: {
      primary: "#5D5A88",
      secondary: "#8D8BA7",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#C87FD3",
          }),
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        helperText: " ",
        // margin: 'normal'
      },
    },
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          color: "#5D5A88",
          borderColor: "#D4D2E3",
        },
      },
    },
  },
});

export default theme;
