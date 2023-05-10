import apps from '../../config/firebase';
import { ref, set, get, remove } from 'firebase/database';
import { DefinitionsItem } from '../../redux/words/types';

const { database } = apps;

export const getUserFavorite = (userId: number | null) => {
  return get(ref(database, `users/${userId}/favorite`));
};

export const addWordToFavorite = (
  userId: number | null,
  word: string,
  results: DefinitionsItem[],
  pronunciation: { all: string },
  firstDefinition: string
) => {
  get(ref(database, `users/${userId}/favorite`)).then((res) => {
    const { createdAt, ...rest } = res.val();
    set(ref(database, 'users/' + userId + '/favorite/'), {
      ...rest,
      [word]: [results, pronunciation, firstDefinition],
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

export const updateMainDefinitionOnFavorite = async (
  userId: number | null,
  word: string,
  selectedItem: string
) => {
  try {
    const snapshot = await get(
      ref(database, `users/${userId}/favorite/${word}`)
    );
    if (snapshot.exists()) {
      const data = snapshot.val();
      const updatedData = [...data];
      updatedData[2] = selectedItem;
      await set(ref(database, `users/${userId}/favorite/${word}`), updatedData);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
