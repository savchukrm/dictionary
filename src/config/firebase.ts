import apps from '../firebase';
import { ref, set, get, remove } from 'firebase/database';
import { DefinitionsItem } from '../redux/words/types';

const { database } = apps;

export const addNewUser = (
  userId: string,
  email: string,
  password: string,
  list: string[]
) => {
  set(ref(database, 'users/' + userId), {
    email,
    list,
    password,
  });
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

export const addWordToFavorite = (
  userId: number | null,
  word: string,
  results: DefinitionsItem[]
) => {
  get(ref(database, `users/${userId}/favorite`)).then((res) => {
    set(ref(database, 'users/' + userId + '/favorite'), {
      ...res.val(),
      [word]: results,
    }).catch((error) => console.log(error));
  });
};

export const removeWordFromFavorite = (userId: number | null, word: string) => {
  remove(ref(database, `users/${userId}/favorite/${word}`));
};

export const getUserFavorite = (userId: number | null) => {
  return get(ref(database, `users/${userId}/favorite`));
};

export const getUserLists = (userId: number | null) => {
  return get(ref(database, `users/${userId}/lists`));
};

export const addWordToList = (
  userId: number | null,
  name: string,
  word: string,
  results: DefinitionsItem[]
) => {
  get(ref(database, `users/${userId}/lists/${name}/`))
    .then((res) => {
      const { createdAt, ...rest } = res.val();
      set(ref(database, `users/${userId}/lists/${name}`), {
        ...rest,
        [word]: results,
      }).catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};
