import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { AddPlayListButton, AppSearch, UserDropdown } from "../molecules";
import SeedPlaylistsButton from "@/components/molecules/SeedPlaylistsButton";

export default function AppHeader() {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GraphicEqIcon sx={{ mr: 2 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Pulse
          </Typography>

          <AppSearch />

          <Box sx={{ flexGrow: 1 }} />

          <Stack sx={{ ml: { xs: 0, md: 2 } }} direction="row" spacing={2}>
            <AddPlayListButton />
            <SeedPlaylistsButton />
            <UserDropdown />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
