import apps from '../../config/firebase';
import { ref, set, get } from 'firebase/database';

const { database } = apps;

export const getUserRequests = (userId: number | null) => {
  return get(ref(database, `users/${userId}/previousRequests`));
};

export const addWordToPreviousRequests = (
  userId: number | null,
  word: string
) => {
  get(ref(database, `users/${userId}/previousRequests`)).then((res) => {
    const { createdAt, ...rest } = res.val();
    set(ref(database, 'users/' + userId + '/previousRequests/'), {
      ...rest,
      [word]: word,
    }).catch((error) => console.log(error));
  });
};
