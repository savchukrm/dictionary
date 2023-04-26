import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { BsFillBookmarkFill } from 'react-icons/bs';

import { RootState } from '../../redux/store';
import {
  addWordToFavorite,
  removeWordFromFavorite,
  getUserFavorite,
} from '../../config/firebase';

import styles from './Popup.module.css';

interface PopupProps {
  setIsNewList: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupMenu: React.FC<PopupProps> = ({ setIsNewList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInList, setIsInList] = useState<boolean>();

  const popupRef = useRef<HTMLDivElement>(null);

  const { words } = useSelector((state: RootState) => state.words);
  const { id } = useSelector((state: RootState) => state.user);

  const toggleIsList = () => {
    isInList
      ? removeWordFromFavorite(id, words.word)
      : addWordToFavorite(id, words.word, words.results);

    setIsInList((prev) => !prev);
  };

  useEffect(() => {
    getUserFavorite(id)
      .then((res) => {
        if (res.val() !== null)
          setIsInList(Object.keys(res.val()).some((el) => el === words.word));
      })
      .catch((error) => console.log(error));
  }, [id, words.word, isInList]);

  const handleModal = () => {
    setIsNewList((prev) => !prev);
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
        <BsFillBookmarkFill className={styles.bookmarkIcon} />
      </button>
      {isOpen && (
        <ul onClick={() => setIsOpen(!isOpen)} className={styles.popupOptions}>
          <li onClick={handleModal}>Create new list</li>
          <li onClick={toggleIsList}>Favorite</li>
        </ul>
      )}
    </div>
  );
};

export default PopupMenu;
