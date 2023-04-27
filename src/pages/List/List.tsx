import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux/store';

import { getUserFavorite } from '../../config/firebase';
import { getUserLists } from '../../config/firebase';

import { setFavorite, clearFavorite } from '../../redux/favorite/slice';
import { setLists } from '../../redux/lists/slice';

import Set from '../../components/Set/Set';

import styles from './List.module.css';

const List = (): JSX.Element => {
  const dispatch = useDispatch();

  const { favorite } = useSelector((state: RootState) => state.favorite);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getUserFavorite(id)
      .then((res) => {
        if (res.val() != null) {
          dispatch(setFavorite(Object.entries(res.val())));
        } else {
          dispatch(clearFavorite());
        }
      })
      .catch((error) => console.log(error));
  }, [dispatch, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserLists(id);
        if (res !== undefined) {
          const userListsArray = Object.keys(res.val()).map((key) => [
            key,
            res.val()[key],
          ]);
          dispatch(setLists(userListsArray));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.listBlock}>
      <h1>My lists</h1>
      <button className={styles.btnAdd}>New list</button>
      <div className={styles.content}>
        {favorite.length === 0 ? (
          <p>You do not have any saved items</p>
        ) : (
          <Set />
        )}
      </div>
    </div>
  );
};

export default List;
