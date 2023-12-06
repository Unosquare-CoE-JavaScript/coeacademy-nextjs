import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { PlayLists } from "@/components/organisms";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 14,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            PlayList Feed
          </Typography>
        </Container>
      </Box>

      <Container sx={{ mt: 6, mb: 8 }} maxWidth="xl">
        <PlayLists />
      </Container>
    </>
  );
}
