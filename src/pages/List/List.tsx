import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux/store';
import { getUserList } from '../../config/firebase';
import { setList, clearList } from '../../redux/list/slice';

import Set from '../../components/Set/Set';
import styles from './List.module.css';

const List = (): JSX.Element => {
  const dispatch = useDispatch();

  const { list } = useSelector((state: RootState) => state.list);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getUserList(id)
      .then((res) => {
        if (res.val() != null) {
          dispatch(setList(Object.entries(res.val())));
        } else {
          dispatch(clearList());
        }
      })
      .catch((error) => console.log(error));
  }, [dispatch, id]);

  return (
    <div className={styles.listBlock}>
      <h1>Saved list</h1>
      <div className={styles.content}>
        {list.length === 0 ? <p>You do not have any saved items</p> : <Set />}
      </div>
    </div>
  );
};

export default List;
