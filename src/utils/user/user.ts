import apps from '../../config/firebase';
import { ref, set } from 'firebase/database';

const { database } = apps;

interface Favorite {
  createdAt: string;
}

export const addNewUser = (
  userId: string,
  email: string | null,
  password: string,
  list: string[],
  folders: string[],
  favorite: Favorite
) => {
  set(ref(database, 'users/' + userId), {
    email,
    list,
    folders,
    password,
    favorite,
  });
};
