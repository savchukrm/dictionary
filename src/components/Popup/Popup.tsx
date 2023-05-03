import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { BsFillBookmarkFill } from 'react-icons/bs';
import { ImCheckmark } from 'react-icons/im';

import { RootState, useAppDispatch } from '../../redux/store';

import { setLists } from '../../redux/lists/slice';

import {
  addWordToFavorite,
  removeWordFromFavorite,
  getUserFavorite,
  getUserLists,
  addWordToList,
  removeWordFromList,
} from '../../utils/firebase';

import styles from './Popup.module.css';

interface ListStates {
  [listName: string]: {
    [word: string]: boolean;
  };
}

const PopupMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isInList, setIsInList] = useState<boolean>();
  const [listStates, setListStates] = useState<ListStates>({});
  const [shouldRenderTick, setShouldRenderTick] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const { words } = useSelector((state: RootState) => state.words);
  const { id } = useSelector((state: RootState) => state.user);
  const { lists } = useSelector((state: RootState) => state.lists);

  useEffect(() => {
    getUserFavorite(id)
      .then((res) => {
        if (res.val() !== null)
          setIsInList(Object.keys(res.val()).some((el) => el === words.word));
      })
      .catch((error) => console.log(error));
  }, [id, words.word]);

  const toggleIsInFavorite = useCallback(() => {
    const newIsInList = !isInList;
    setIsInList(newIsInList);

    if (newIsInList) {
      addWordToFavorite(id, words.word, words.results);
    } else {
      removeWordFromFavorite(id, words.word);
    }
  }, [id, isInList, words.results, words.word]);

  useEffect(() => {
    getUserLists(id)
      .then((res) => {
        if (res.val() !== null) dispatch(setLists(lists));
        const fetchedLists = res.val() as {
          [listName: string]: { [word: string]: boolean };
        } | null;
        const newStates: ListStates = {};
        for (const [listName, listData] of Object.entries(fetchedLists || {})) {
          if (listData && Object.keys(listData).includes(words.word)) {
            newStates[listName] = { ...listData };
          }
        }
        setListStates((prev) => ({ ...prev, ...newStates }));
      })
      .catch((error) => console.log(error));
  }, [words.word, id, dispatch, lists]);

  const toggleWordInList = (listName: string): void => {
    const wordStates = listStates[listName] || {};
    const isInList = wordStates[words.word];

    if (isInList) {
      removeWordFromList(id, listName, words.word);
    } else {
      addWordToList(id, listName, words.word, words.results);
    }

    const newListStates = {
      ...listStates,
      [listName]: {
        ...wordStates,
        [words.word]: !isInList,
      },
    };

    setListStates(newListStates);

    const shouldRenderTick =
      Object.values(newListStates).some(
        (wordStates) => wordStates[words.word]
      ) || isInList;
    setShouldRenderTick(shouldRenderTick);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={popupRef} className={styles.popup}>
      <button className={styles.popupBtn} onClick={() => setIsOpen(!isOpen)}>
        <BsFillBookmarkFill />
      </button>

      {isOpen && (
        <ul className={styles.popupOptions}>
          <Link to="/lists">
            <li className={styles.btnNewList}>Create new list</li>
          </Link>
          <li onClick={toggleIsInFavorite}>
            Favourites
            {isInList ? (
              <button className={styles.tick}>
                <ImCheckmark />
              </button>
            ) : (
              ''
            )}
          </li>

          {lists.map((item, i) => {
            const [listName] = item;
            const isInList = listStates[listName];
            const shouldRenderTick = isInList?.[words.word] ?? false;

            return (
              <li
                onClick={() => {
                  toggleWordInList(listName);
                }}
                key={i}
              >
                {listName}
                {shouldRenderTick && (
                  <button className={styles.tick}>
                    <ImCheckmark />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PopupMenu;
