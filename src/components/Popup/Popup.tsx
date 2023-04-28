import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { BsFillBookmarkFill } from 'react-icons/bs';
import { ImCheckmark } from 'react-icons/im';

import { RootState } from '../../redux/store';
import {
  addWordToFavorite,
  removeWordFromFavorite,
  getUserFavorite,
  addWordToList,
  removeWordFromList,
} from '../../config/firebase';

import styles from './Popup.module.css';

const PopupMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInList, setIsInList] = useState<boolean>();
  const [listStates, setListStates] = useState<Record<string, boolean>>({});

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
  }, [id, words.word, isInList]);

  const toggleIsInFavorite = useCallback(() => {
    const newIsInList = !isInList;
    setIsInList(newIsInList);

    if (newIsInList) {
      addWordToFavorite(id, words.word, words.results);
    } else {
      removeWordFromFavorite(id, words.word);
    }
  }, [isInList, id, words.word, words.results]);

  const toggleWordInList = (listName: string) => {
    const isInList = listStates[listName];
    if (isInList) {
      removeWordFromList(id, listName, words.word);
    } else {
      addWordToList(id, listName, words.word, words.results);
    }
    setListStates((prev) => ({
      ...prev,
      [listName]: !isInList,
    }));
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
            const [listName, listData] = item;
            const isWordInCurrentList =
              listData && Object.keys(listData).some((el) => el === words.word);
            const isInList = listStates[listName];
            const shouldRenderTick = isWordInCurrentList && isInList;

            return (
              <li
                onClick={() => {
                  toggleWordInList(listName);
                }}
                key={i + 1}
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
