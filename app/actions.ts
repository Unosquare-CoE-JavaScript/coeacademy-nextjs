"use server";

import { DATABASE_COLLECTIONS } from "@/lib/types";
import { newPlaylistFormFields } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { getServerSession } from "next-auth";
import { db } from "@/lib/firebase";
import playlists from "@/app/data/playlists.json";

export async function createNewPlaylist(formData: FormData) {
  const data = newPlaylistFormFields.reduce(
    (acc, { id, name }) => ({ ...acc, [name]: formData.get(id) }),
    {},
  );

  const playlistsCollection = collection(db, DATABASE_COLLECTIONS.playlists);
  const session = await getServerSession();
  const newPlaylist = {
    ...data,
    owner: {
      name: session?.user?.name || "",
      email: session?.user?.email,
    },
    createdAt: Timestamp.now(),
  };

  try {
    await addDoc(playlistsCollection, newPlaylist);
    revalidatePath("/");
    return { msg: "Success" };
  } catch (error) {
    return { msg: "Error", error };
  }
}

export async function seedPlaylists() {
  const playlistsCollection = collection(db, DATABASE_COLLECTIONS.playlists);
  await sleep(3000);

  try {
    // delete all existing playlists in chunks of 100
    while (true) {
      const batch = writeBatch(db);
      const playlistsQuery = query(playlistsCollection, limit(100));
      const snapshot = await getDocs(playlistsQuery);

      if (snapshot.docs.length === 0) {
        break;
      }

      snapshot.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
    }

    // now create new ones
    for (const e of playlists) {
      const newPlaylist = {
        title: e.title,
        link: e.url,
        description: e.description,
        owner: e.owner,
        image: e.image,
        createdAt: Timestamp.now(),
      };
      await addDoc(playlistsCollection, newPlaylist);
    }
    revalidatePath("/");
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
