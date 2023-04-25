import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { BsFillBookmarkFill } from 'react-icons/bs';

import { RootState } from '../../redux/store';
import {
  addWordToList,
  removeWordFromList,
  getUserList,
} from '../../config/firebase';

import styles from './Popup.module.css';

const PopupMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isInList, setIsInList] = useState<boolean>();

  const { words } = useSelector((state: RootState) => state.words);
  const { id } = useSelector((state: RootState) => state.user);

  const toggleIsList = () => {
    isInList
      ? removeWordFromList(id, words.word)
      : addWordToList(id, words.word, words.results);

    setIsInList((prev) => !prev);
  };

  useEffect(() => {
    getUserList(id)
      .then((res) => {
        if (res.val() !== null)
          setIsInList(Object.keys(res.val()).some((el) => el === words.word));
      })
      .catch((error) => console.log(error));
  }, [id, words.word, isInList]);

  return (
    <div className={styles.popup}>
      <button className={styles.popupBtn} onClick={() => setIsOpen(!isOpen)}>
        <BsFillBookmarkFill className={styles.bookmarkIcon} />
      </button>
      {isOpen && (
        <ul className={styles.popupOptions}>
          <li>Create new list</li>
          <li onClick={toggleIsList}>Favorite</li>
        </ul>
      )}
    </div>
  );
};

export default PopupMenu;
