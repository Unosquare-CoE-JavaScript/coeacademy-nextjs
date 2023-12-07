import { AppHeader } from "@/components/organisms";
import { Copyright } from "@/components/atoms";

import { Box } from "@mui/material";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex flex-col h-[100vh]">
      <AppHeader />

      <main className="mt-[80px]">{children}</main>
      <Box sx={{ flexGrow: 1 }} />
      <Copyright />
    </Box>
  );
}