import { db } from "@/lib/firebase";
import { DATABASE_COLLECTIONS, IPlayListCollection } from "@/lib/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function fetchPlaylists() {
  const playlistsCollection = collection(db, DATABASE_COLLECTIONS.playlists);
  const playlistsQuery = query(
    playlistsCollection,
    orderBy("createdAt", "desc"),
  );

  const snapshots = await getDocs(playlistsQuery);
  return snapshots.docs.map((doc) => ({
    ...(doc.data() as IPlayListCollection),
    id: doc.id,
  }));
}
