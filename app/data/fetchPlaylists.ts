import { db } from "@/lib/firebase";
import { DATABASE_COLLECTIONS, IPlayListCollection } from "@/lib/types";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  Query,
  query,
  where,
} from "firebase/firestore";

export async function fetchPlaylists(searchTerm: string) {
  const playlistsCollection = collection(db, DATABASE_COLLECTIONS.playlists);

  let playlistsQuery: Query<DocumentData, DocumentData>;
  if (searchTerm) {
    playlistsQuery = query(
      playlistsCollection,
      // firestore doesn't support startsWith, but this seems to work (with limitations)
      // https://stackoverflow.com/a/56815787/9778302
      where("title", ">=", searchTerm),
      where("title", "<=", searchTerm + "\uf8ff"),
      orderBy("title", "asc"),
    );
  } else {
    playlistsQuery = query(playlistsCollection, orderBy("createdAt", "desc"));
  }

  const snapshots = await getDocs(playlistsQuery);
  return snapshots.docs.map((doc) => ({
    ...(doc.data() as IPlayListCollection),
    id: doc.id,
  }));
}
