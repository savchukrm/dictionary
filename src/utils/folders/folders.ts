import apps from '../../config/firebase';
import { ref, set, get, remove, update } from 'firebase/database';

const { database } = apps;

export const getUserFolders = (userId: number | null) => {
  return get(ref(database, `users/${userId}/folders`));
};

export const createNewFolder = (userId: number | null, name: string) => {
  const now = new Date().toISOString();

  get(ref(database, `users/${userId}/folders/`))
    .then(() => {
      set(ref(database, `users/${userId}/folders/${name}`), {
        createdAt: now,
      }).catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export const changeFolderName = async (
  userId: number | null,
  oldName: string,
  newName: string
) => {
  try {
    const snapshot = await get(
      ref(database, `users/${userId}/folders/${oldName}`)
    );
    if (snapshot.exists()) {
      const data = snapshot.val();
      await update(ref(database, `users/${userId}/folders/${newName}`), data);
      await remove(ref(database, `users/${userId}/folders/${oldName}`));
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
