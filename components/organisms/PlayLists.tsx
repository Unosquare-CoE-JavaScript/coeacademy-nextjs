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

async function PlayLists() {
  const playlists = await fetchPlaylists();

  return (
    <Grid container spacing={4}>
      {playlists.map(({ id, title, owner, createdAt, image }) => (
        <Grid item key={id} xs={6} sm={4} md={3} lg={2}>
          <Card sx={{ maxWidth: 200 }}>
            <CardMedia
              component="img"
              image={image}
              alt={title}
              sx={{ width: 200, height: 200 }}
            />
            <CardContent>
              <Typography
                variant="subtitle1"
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
