import apps from '../../config/firebase';
import { ref, set } from 'firebase/database';

const { database } = apps;

interface Required {
  createdAt: string;
}

export const addNewUser = (
  userId: string,
  email: string | null,
  password: string,
  list: string[],
  folders: string[],
  favorite: Required,
  previousRequests: Required
) => {
  set(ref(database, 'users/' + userId), {
    email,
    list,
    folders,
    password,
    favorite,
    previousRequests,
  });
};
