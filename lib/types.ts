import { Timestamp } from "firebase/firestore";

/** Collections **/
export enum DATABASE_COLLECTIONS {
  users = "users",
  playlists = "playlists",
}

export interface IUserCollection {
  id?: string;
  email: string;
  image?: string;
  name: string;
}

export interface IPlayListCollection {
  id?: string;
  title: string;
  link: string;
  image: string;
  description: string;
  owner: IUserCollection;
  createdAt: Timestamp;
}
/** End Collections **/

/** Forms */
type TGridSize = {
  xs?: number;
  sm?: number;
};

export interface IFormField {
  autoFocus?: boolean;
  gridSizes: TGridSize;
  id: string;
  label: string;
  name: string;
  rows?: number;
  placeholder: string;
  required?: boolean;
}
/** End Forms */
