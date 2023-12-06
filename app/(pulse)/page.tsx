import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { PlayLists } from "@/components/organisms";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const query = searchParams?.query || "";

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
        <Suspense fallback={<p>Loading...</p>}>
          <PlayLists query={query} />
        </Suspense>
      </Container>
    </>
  );
}
