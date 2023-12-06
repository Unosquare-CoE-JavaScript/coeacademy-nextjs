"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { AppForm, AppModal } from ".";
import { createNewPlaylist } from "@/app/actions";
import { newPlaylistFormFields } from "@/lib/utils";

export default function AddPlayListButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        color="inherit"
        variant="outlined"
        onClick={handleOpen}
        startIcon={<PlaylistAddIcon />}
      >
        Add Playlist
      </Button>
      <AppModal open={open} handleClose={handleClose}>
        <AppForm
          fields={newPlaylistFormFields}
          handleSubmit={async (formData) => {
            const data = await createNewPlaylist(formData);
            handleClose();
          }}
          submitOptions={{
            loading: false,
            label: "Create playlist",
          }}
        />
      </AppModal>
    </>
  );
}
