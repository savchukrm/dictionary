import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux/store';

import { getUserFavorite } from '../../config/firebase';
import { getUserLists } from '../../config/firebase';

import { setFavorite, clearFavorite } from '../../redux/favorite/slice';
import { setLists } from '../../redux/lists/slice';

import styles from './List.module.css';
import ListBlock from '../../components/ListBlock/ListBlock';

const List = (): JSX.Element => {
  const dispatch = useDispatch();

  const { id } = useSelector((state: RootState) => state.user);
  const { lists } = useSelector((state: RootState) => state.lists);

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
        <ul className={styles.blocks}>
          <li key={0}>
            <ListBlock title="favorite" />
          </li>
          {lists.map((item, i) => (
            <li key={i + 1}>
              <ListBlock title={item[0]} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
