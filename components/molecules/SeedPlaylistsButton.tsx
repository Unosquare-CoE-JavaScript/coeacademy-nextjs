"use client";

import { seedPlaylists } from "@/app/actions";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useCallback, useState } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import GrassIcon from "@mui/icons-material/Grass";
// @ts-ignore
import { useFormStatus } from "react-dom";

export default function SeedPlaylistsButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = useCallback(async () => {
    await seedPlaylists();
    setOpen(false);
  }, []);

  return (
    <>
      <Button
        color="inherit"
        variant="outlined"
        startIcon={<GrassIcon />}
        onClick={handleOpen}
      >
        Seed Playlists
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Stack direction="row" spacing={2}>
            <WarningIcon color="warning" fontSize="large" />
            <span>Seed playlists?</span>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete all existing playlists and create new ones. <br />
            Continue?
          </DialogContentText>
        </DialogContent>
        <form action={handleOk}>
          <DialogActions>
            <ActionButtons handleClose={handleClose} />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

interface ActionButtonsProps {
  handleClose: () => void;
}

function ActionButtons(props: ActionButtonsProps) {
  const { handleClose } = props;
  const { pending } = useFormStatus();

  return (
    <>
      <Button onClick={handleClose} autoFocus disabled={pending}>
        Cancel
      </Button>
      <Box sx={{ position: "relative" }}>
        <Button type="submit" disabled={pending}>
          Ok
        </Button>
        {pending && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </>
  );
}
