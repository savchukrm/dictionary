import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux/store';
import { getUserFavorite } from '../../config/firebase';
import { setList, clearList } from '../../redux/list/slice';
import { getUserLists } from '../../config/firebase';

import Set from '../../components/Set/Set';
import styles from './List.module.css';

const List = (): JSX.Element => {
  const dispatch = useDispatch();

  const [userLists, setUsersLists] = useState<any>();

  const { list } = useSelector((state: RootState) => state.list);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getUserFavorite(id)
      .then((res) => {
        if (res.val() != null) {
          dispatch(setList(Object.entries(res.val())));
        } else {
          dispatch(clearList());
        }
      })
      .catch((error) => console.log(error));
  }, [dispatch, id]);

  useEffect(() => {
    getUserLists(id)
      .then((res) => {
        if (res !== undefined) {
          const userListsArray = Object.entries(res.val());
          setUsersLists(userListsArray);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.listBlock}>
      <h1>My lists</h1>
      <button className={styles.btnAdd}>New list</button>
      <div className={styles.content}>
        {list.length === 0 ? <p>You do not have any saved items</p> : <Set />}
      </div>
    </div>
  );
};

export default List;
