import apps from '../firebase';
import { ref, set, get } from 'firebase/database';

const { database } = apps;

export const addNewUser = (userId, email, password, list) => {
  set(ref(database, 'users/' + userId), {
    email,
    list,
    password,
  });
};

export const addWordToList = (userId, word, definition) => {
  get(ref(database, `users/${userId}/list`)).then((res) => {
    set(ref(database, 'users/' + userId + '/list'), {
      ...res.val(),
      [word]: definition,
    }).catch((error) => console.log(error));
  });
};
