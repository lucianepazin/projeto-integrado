import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import LoginModalProvider from "@/components/login/LoginModalProvider";
import LoginRegisterButtons from "@/components/login/LoginRegisterButtons";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

//TODO trocar texto
export const metadata = {
  title: "Next.js App Router + Material UI v5",
  description: "Next.js App Router + Material UI v5",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <ThemeRegistry>
          <LoginModalProvider>
            <AppBar position="fixed" sx={{ zIndex: 2000 }}>
              <Toolbar
                sx={{
                  backgroundColor: "background.paper",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" noWrap component={Link} href="/">
                  Find a Pet
                </Typography>
                <LoginRegisterButtons />
              </Toolbar>
            </AppBar>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                mt: ["48px", "56px", "64px"],
                p: 3,
              }}
            >
              {children}
            </Box>
          </LoginModalProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
