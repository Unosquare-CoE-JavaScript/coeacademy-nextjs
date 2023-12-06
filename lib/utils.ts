import { IFormField } from "./types";

/** Forms fields */
export const newPlaylistFormFields: IFormField[] = [
  {
    autoFocus: true,
    gridSizes: { xs: 12 },
    id: "playlist-title",
    label: "Title",
    name: "title",
    placeholder: "A short and creative title for your playlist",
    required: true,
  },
  {
    gridSizes: { xs: 12 },
    id: "playlist-image",
    label: "Image",
    name: "image",
    placeholder: "A URL to the playlist image",
    required: true,
  },
  {
    gridSizes: { xs: 12 },
    id: "playlist-link",
    label: "Link",
    name: "link",
    placeholder: "The awesome playlist link",
    required: true,
  },
  {
    gridSizes: { sm: 12 },
    id: "playlist-description",
    label: "Description",
    name: "description",
    rows: 4,
    placeholder: "Tell the world what is this amazing playlist about!",
    required: false,
  },
];
/** End Forms fields */
