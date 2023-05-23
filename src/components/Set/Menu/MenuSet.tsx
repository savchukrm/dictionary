import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../../redux/store';

import { removeWordFromFavorite } from '../../../utils/favorite/favorite';
import { removeWordFromList } from '../../../utils/lists/list';

import { setList } from '../../../redux/list/slice';
import { setFavorite } from '../../../redux/favorite/slice';

import styles from '../../Blocks/ListBlock/Menu/Menu.module.css';

interface MenuSetProps {
  word: string;
  listName: string | undefined;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setModalSelect: React.Dispatch<React.SetStateAction<boolean>>;
  setModalChangeWord: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuSet: React.FC<MenuSetProps> = ({
  word,
  listName,
  setOpenMenu,
  setModalSelect,
  setModalChangeWord,
}) => {
  const dispatch = useAppDispatch();

  const { id } = useSelector((state: RootState) => state.user);
  const { list } = useSelector((state: RootState) => state.list);
  const { favorite } = useSelector((state: RootState) => state.favorite);

  const handleOpenModalSelect = () => {
    setModalSelect(true);
    setOpenMenu(false);

    document.body.classList.add('modal-open');
  };

  const handleOpenModalChangeWord = () => {
    setModalChangeWord(true);
    setOpenMenu(false);

    document.body.classList.add('modal-open');
  };

  const deleteWordFromFavorite = () => {
    removeWordFromFavorite(id, word);

    const updateList = () => {
      const now = new Date().toISOString();
      const updatedList = favorite.filter((el) => el[0] !== word);

      if (updatedList.length === 0) {
        return [['createdAt', now]];
      } else {
        return updatedList;
      }
    };

    const updatedList = updateList();
    dispatch(setFavorite(updatedList));
  };

  const deleteWordFromCurrentList = () => {
    removeWordFromList(id, listName, word);

    const updateList = () => {
      const now = new Date().toISOString();
      const updatedList = list.filter((el) => el[0] !== word);

      if (updatedList.length === 0) {
        return [['createdAt', now]];
      } else {
        return updatedList;
      }
    };

    const updatedList = updateList();
    dispatch(setList(updatedList));
  };

  const handleDeleteWordFromList = () => {
    listName === 'favorite'
      ? deleteWordFromFavorite()
      : deleteWordFromCurrentList();

    setOpenMenu(false);
  };

  return (
    <ul className="menuSetBlock">
      <div onClick={handleOpenModalSelect} className={styles.item}>
        Change definition
      </div>
      <div onClick={handleOpenModalChangeWord} className={styles.item}>
        Write own term
      </div>
      <div onClick={handleDeleteWordFromList} className={styles.item}>
        Remove word
      </div>
    </ul>
  );
};

export default MenuSet;
