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

export const addWordToList = (userId, word, results) => {
  get(ref(database, `users/${userId}/list`)).then((res) => {
    set(ref(database, 'users/' + userId + '/list'), {
      ...res.val(),
      [word]: results,
    }).catch((error) => console.log(error));
  });
};

export const removeWordFromList = (userId, word) => {
  remove(ref(database, `users/${userId}/list/${word}`));
};

export const getUserList = (userId) => {
  return get(ref(database, `users/${userId}/list`));
};
