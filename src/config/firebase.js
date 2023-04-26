import apps from '../firebase';
import { ref, set, get, remove } from 'firebase/database';

const { database } = apps;

export const addNewUser = (userId, email, password, list) => {
  set(ref(database, 'users/' + userId), {
    email,
    list,
    password,
  });
};

export const createNewList = (userId, name) => {
  const now = new Date().toISOString();

  get(ref(database, `users/${userId}/lists/`))
    .then(() => {
      set(ref(database, `users/${userId}/lists/${name}`), {
        createdAt: now,
      }).catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export const addWordToFavorite = (userId, word, results) => {
  get(ref(database, `users/${userId}/favorite`)).then((res) => {
    set(ref(database, 'users/' + userId + '/favorite'), {
      ...res.val(),
      [word]: results,
    }).catch((error) => console.log(error));
  });
};

export const removeWordFromFavorite = (userId, word) => {
  remove(ref(database, `users/${userId}/favorite/${word}`));
};

export const getUserFavorite = (userId) => {
  return get(ref(database, `users/${userId}/favorite`));
};

export const getUserLists = (userId) => {
  return get(ref(database, `users/${userId}/lists`));
};
