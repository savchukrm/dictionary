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
  if (word.trim() === '') {
    return;
  }

  const previousRequestsRef = ref(database, `users/${userId}/previousRequests`);

  get(previousRequestsRef).then((res) => {
    const { createdAt, ...rest } = res.val();
    const previousRequests = Object.values(rest);

    const updatedRequests = [...previousRequests, word];

    const limitedRequests = updatedRequests.slice(-10);

    set(previousRequestsRef, limitedRequests).catch((error) =>
      console.log(error)
    );
  });
};
