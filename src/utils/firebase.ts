import apps from '../config/firebase';
import { ref, set, get, remove, update } from 'firebase/database';
import { DefinitionsItem } from '../redux/words/types';

const { database } = apps;

interface Favorite {
  createdAt: string;
}

export const addNewUser = (
  userId: string,
  email: string | null,
  password: string,
  list: string[],
  favorite: Favorite
) => {
  set(ref(database, 'users/' + userId), {
    email,
    list,
    password,
    favorite,
  });
};

export const addWordToFavorite = (
  userId: number | null,
  word: string,
  results: DefinitionsItem[]
) => {
  get(ref(database, `users/${userId}/favorite`)).then((res) => {
    const { createdAt, ...rest } = res.val();
    set(ref(database, 'users/' + userId + '/favorite/'), {
      ...rest,
      [word]: results,
    }).catch((error) => console.log(error));
  });
};

export const removeWordFromFavorite = (userId: number | null, word: string) => {
  get(ref(database, `users/${userId}/favorite/`))
    .then((res) => {
      const list = res.val();
      const listLenght = Object.keys(list).length;
      const now = new Date().toISOString();

      if (listLenght === 1) {
        set(ref(database, `users/${userId}/favorite/`), {
          createdAt: now,
        }).catch((error) => console.log(error));
        remove(ref(database, `users/${userId}/favorite/${word}`)).catch(
          (error) => console.log(error)
        );
      } else {
        remove(ref(database, `users/${userId}/favorite/${word}`)).catch(
          (error) => console.log(error)
        );
      }
    })
    .catch((error) => console.log(error));
};

export const getUserFavorite = (userId: number | null) => {
  return get(ref(database, `users/${userId}/favorite`));
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

export const getUserLists = (userId: number | null) => {
  return get(ref(database, `users/${userId}/lists`));
};

export const getUserList = (
  userId: number | null,
  name: string | undefined
) => {
  return get(ref(database, `users/${userId}/lists/${name}`));
};

export const addWordToList = (
  userId: number | null,
  name: string,
  word: string,
  results: DefinitionsItem[],
  pronunciation: { all: string }
) => {
  get(ref(database, `users/${userId}/lists/${name}/`))
    .then((res) => {
      const { createdAt, ...rest } = res.val();
      set(ref(database, `users/${userId}/lists/${name}`), {
        ...rest,
        [word]: [results, pronunciation],
      }).catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export const removeWordFromList = async (
  userId: number | null,
  name: string,
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

export const getWordFromList = (
  userId: number | null,
  listName: string | undefined,
  word: string
) => {
  return get(ref(database, `users/${userId}/lists/${listName}/${word}/0`));
};
