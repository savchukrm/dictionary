import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';

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
  const { favorite } = useSelector((state: RootState) => state.favorite);

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
  }, [dispatch, id]);

  const handleModal = () => {
    setIsNewList((prev) => !prev);
  };

  const favoriteLength = favorite.find((item) => item[0] === 'createdAt')
    ? 0
    : favorite.length;

  return (
    <div className={styles.listBlock}>
      {isNewList && <ModalInput setIsNewList={setIsNewList} />}

      <div className={styles.header}>
        <Link to="/">
          <button className="btnBack">
            <IoMdArrowRoundBack />
            return
          </button>
        </Link>

        <h1>My lists</h1>

        <button onClick={handleModal} className={styles.btnAdd}>
          new list
        </button>
      </div>

      <div className={styles.content}>
        <ul className={styles.blocks}>
          <li key={0}>
            <Link to="/lists/favourite">
              <ListBlock length={favoriteLength} title="favourites" />
            </Link>
          </li>

          {lists.map((item, i) => {
            const [title, content] = item;
            const contentLength = Object.entries(content);

            const lengthValue = contentLength.find(
              (el) => el[0] === 'createdAt'
            )
              ? 0
              : contentLength.length;

            return (
              <li key={i + 1}>
                <ListBlock title={title} length={lengthValue} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Lists;
