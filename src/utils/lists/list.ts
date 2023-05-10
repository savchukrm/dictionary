import apps from '../../config/firebase';
import { ref, set, get, remove, update } from 'firebase/database';
import { DefinitionsItem } from '../../redux/words/types';

const { database } = apps;

export const getUserLists = (userId: number | null) => {
  return get(ref(database, `users/${userId}/lists`));
};

export const getUserList = (
  userId: number | null,
  name: string | undefined
) => {
  return get(ref(database, `users/${userId}/lists/${name}`));
};

export const createNewList = (userId: number | null, name: string) => {
  const now = new Date().toISOString();

  get(ref(database, `users/${userId}/lists/`))
    .then(() => {
      set(ref(database, `users/${userId}/lists/${name}`), {
        createdAt: now,
      }).catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export const addWordToList = (
  userId: number | null,
  name: string,
  word: string,
  results: DefinitionsItem[],
  pronunciation: { all: string },
  firstDefinition: string
) => {
  get(ref(database, `users/${userId}/lists/${name}/`))
    .then((res) => {
      const { createdAt, ...rest } = res.val();
      set(ref(database, `users/${userId}/lists/${name}`), {
        ...rest,
        [word]: [results, pronunciation, firstDefinition],
      }).catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export const removeWordFromList = async (
  userId: number | null,
  name: string | undefined,
  word: string
) => {
  get(ref(database, `users/${userId}/lists/${name}/`))
    .then((res) => {
      const list = res.val();
      const listLenght = Object.keys(list).length;
      const now = new Date().toISOString();

      if (listLenght === 1) {
        set(ref(database, `users/${userId}/lists/${name}`), {
          createdAt: now,
        }).catch((error) => console.log(error));
        remove(ref(database, `users/${userId}/lists/${name}/${word}`)).catch(
          (error) => console.log(error)
        );
      } else {
        remove(ref(database, `users/${userId}/lists/${name}/${word}`)).catch(
          (error) => console.log(error)
        );
      }
    })
    .catch((error) => console.log(error));
};

export const removeListFromLists = (userId: number | null, list: string) => {
  remove(ref(database, `users/${userId}/lists/${list}`));
};

export const changeListName = async (
  userId: number | null,
  oldName: string,
  newName: string
) => {
  try {
    const snapshot = await get(
      ref(database, `users/${userId}/lists/${oldName}`)
    );
    if (snapshot.exists()) {
      const data = snapshot.val();
      await update(ref(database, `users/${userId}/lists/${newName}`), data);
      await remove(ref(database, `users/${userId}/lists/${oldName}`));
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateMainDefinitionOnList = async (
  userId: number | null,
  listName: string | undefined,
  word: string,
  selectedItem: string
) => {
  try {
    const snapshot = await get(
      ref(database, `users/${userId}/lists/${listName}/${word}`)
    );
    if (snapshot.exists()) {
      const data = snapshot.val();
      const updatedData = [...data];
      updatedData[2] = selectedItem;
      await set(
        ref(database, `users/${userId}/lists/${listName}/${word}`),
        updatedData
      );
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
