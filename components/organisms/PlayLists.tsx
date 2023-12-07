import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchPlaylists } from "@/app/data/fetchPlaylists";
import Image from "next/image";

interface PlaylistsProps {
  query: string;
}

async function PlayLists(props: PlaylistsProps) {
  const { query } = props;
  const playlists = await fetchPlaylists(query);

  if (playlists.length === 0) {
    return (
      <Typography sx={{ textAlign: "center" }}>
        No playlists found :c
      </Typography>
    );
  }

  return (
    <Grid container spacing={4}>
      {playlists.map(({ id, title, owner, createdAt, image }) => (
        <Grid item key={id} xs={6} sm={4} md={3} lg={2}>
          <Card sx={{ maxWidth: 200 }}>
            <CardMedia>
              <Image
                  src={image}
                  width={250}
                  height={250}
                  alt="Live from space album cover"
                />
            </CardMedia>
            <CardContent>
              <Typography
                className="truncate"
                title={title}
              >
                {title}
              </Typography>
              <Typography component="p" variant="body2" color="text.secondary">
                Added by {owner.name} on {createdAt.toDate().toDateString()}
              </Typography>
            </CardContent>
            <CardActions className="flex justify-between">
              <Button size="small">Listen</Button>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PlayLists;
