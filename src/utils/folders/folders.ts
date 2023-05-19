import apps from '../../config/firebase';
import { ref, set, get, remove, update } from 'firebase/database';

const { database } = apps;

export const getUserFolders = (userId: number | null) => {
  return get(ref(database, `users/${userId}/folders`));
};

export const getUserFolder = (
  userId: number | null,
  name: string | undefined
) => {
  return get(ref(database, `users/${userId}/folders/${name}`));
};

export const createNewFolder = (userId: number | null, name: string) => {
  get(ref(database, `users/${userId}/folders/`))
    .then(() => {
      set(ref(database, `users/${userId}/folders/${name}`), {
        description: '',
      }).catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export const removeFolderFromFolders = (
  userId: number | null,
  folder: string
) => {
  remove(ref(database, `users/${userId}/folders/${folder}`));
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

export const changeDescriptionForFolder = async (
  userId: number | null,
  folderName: string,
  descr: string
) => {
  const folderRef = ref(database, `users/${userId}/folders/${folderName}`);

  try {
    const snapshot = await get(folderRef);
    if (snapshot.exists()) {
      await set(folderRef, {
        ...snapshot.val(),
        description: descr,
      });
    } else {
      console.log('Folder does not exist.');
    }
  } catch (error) {
    console.log('An error occurred:', error);
  }
};

export const addNewTermToFolder = (
  userId: number | null,
  folderName: string | undefined,
  meaning: string,
  definition: string
) => {
  get(ref(database, `users/${userId}/folders/${folderName}`))
    .then((snapshot) => {
      const folder = snapshot.val();
      const updatedTerms = folder.terms ? [...folder.terms] : [];
      updatedTerms.push({ definition, meaning });

      set(ref(database, `users/${userId}/folders/${folderName}`), {
        ...folder,
        terms: updatedTerms,
        description: folder.description || '',
      }).catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export const updateDefinition = (
  userId: number | null,
  folderName: string | undefined,
  index: number,
  newDefinition: string
) => {
  get(ref(database, `users/${userId}/folders/${folderName}`))
    .then((snapshot) => {
      const folder = snapshot.val();
      const updatedTerms = folder.terms ? [...folder.terms] : [];

      if (index >= 0 && index < updatedTerms.length) {
        updatedTerms[index].definition = newDefinition;
      }

      set(ref(database, `users/${userId}/folders/${folderName}`), {
        ...folder,
        terms: updatedTerms,
        description: folder.description || '',
      }).catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export const updateMeaning = (
  userId: number | null,
  folderName: string | undefined,
  index: number,
  newMeaning: string
) => {
  get(ref(database, `users/${userId}/folders/${folderName}`))
    .then((snapshot) => {
      const folder = snapshot.val();
      const updatedTerms = folder.terms ? [...folder.terms] : [];

      if (index >= 0 && index < updatedTerms.length) {
        updatedTerms[index].meaning = newMeaning;
      }

      set(ref(database, `users/${userId}/folders/${folderName}`), {
        ...folder,
        terms: updatedTerms,
        description: folder.description || '',
      }).catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export const deleteTermFromFolder = (
  userId: number | null,
  folderName: string | undefined,
  indexToDelete: number
) => {
  get(ref(database, `users/${userId}/folders/${folderName}`))
    .then((snapshot) => {
      const folder = snapshot.val();
      const updatedTerms = folder.terms ? [...folder.terms] : [];

      if (indexToDelete >= 0 && indexToDelete < updatedTerms.length) {
        updatedTerms.splice(indexToDelete, 1); // Remove the term at the specified index
      }

      set(ref(database, `users/${userId}/folders/${folderName}`), {
        ...folder,
        terms: updatedTerms,
        description: folder.description || '',
      }).catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};
