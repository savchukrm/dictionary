import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../../redux/store';

import { removeWordFromFavorite } from '../../../utils/favorite/favorite';
import { removeWordFromList } from '../../../utils/lists/list';

import { setList } from '../../../redux/list/slice';
import { setFavorite } from '../../../redux/favorite/slice';

import styles from '../../ListBlock/Menu/Menu.module.css';

interface MenuSetProps {
  setModalSelect: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  listName: string | undefined;
  word: string;
}

const MenuSet: React.FC<MenuSetProps> = ({
  setModalSelect,
  setOpenMenu,
  listName,
  word,
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
      <div className={styles.item} onClick={handleDeleteWordFromList}>
        Remove word
      </div>
    </ul>
  );
};

export default MenuSet;
