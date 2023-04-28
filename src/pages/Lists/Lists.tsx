import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux/store';

import { getUserFavorite } from '../../config/firebase';
import { getUserLists } from '../../config/firebase';

import { setFavorite, clearFavorite } from '../../redux/favorite/slice';
import { setLists } from '../../redux/lists/slice';

import ListBlock from '../../components/ListBlock/ListBlock';
import ModalInput from '../../components/ModalInput/ModalInput';

import styles from './Lists.module.css';

const Lists = (): JSX.Element => {
  const dispatch = useDispatch();

  const { id } = useSelector((state: RootState) => state.user);
  const { lists } = useSelector((state: RootState) => state.lists);

  const [isNewList, setIsNewList] = useState<boolean>(false);

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
        if (res.val() !== undefined) {
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
  }, [dispatch, id, lists]);

  const handleModal = () => {
    setIsNewList((prev) => !prev);
  };

  return (
    <div className={styles.listBlock}>
      {isNewList && <ModalInput setIsNewList={setIsNewList} />}

      <h1>My lists</h1>
      <button onClick={handleModal} className={styles.btnAdd}>
        New list
      </button>
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

export default Lists;
