import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../redux/store';

import { getUserFavorite } from '../../utils/favorite/favorite';
import { getUserLists, createNewList } from '../../utils/lists/list';

import { setFavorite } from '../../redux/favorite/slice';
import { setLists } from '../../redux/lists/slice';

import PageHeader from '../../components/Headers/PageHeader/PageHeader';
import ListBlock from '../../components/Blocks/ListBlock/ListBlock';
import FavoriteBlock from '../../components/Blocks/ListBlock/FavoriteBlock';
import ModalInput from '../../components/Modals/ModalInput/ModalInput';
import Skeleton from '../../components/Skeleton/Skeleton';

import styles from './Lists.module.css';

const Lists = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { id } = useSelector((state: RootState) => state.user);
  const { lists } = useSelector((state: RootState) => state.lists);
  const { favorite } = useSelector((state: RootState) => state.favorite);

  const [isNewList, setIsNewList] = useState<boolean>(false);
  const [isLoding, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUserFavorite(id)
      .then((res) => {
        if (res.val() != null) {
          dispatch(setFavorite(Object.entries(res.val())));
        }
      })
      .catch((error) => console.log(error));
  }, [dispatch, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserLists(id);

        if (res.val() !== undefined && res.val() !== null) {
          const userListsArray = Object.keys(res.val()).map((key) => [
            key,
            res.val()[key],
          ]);
          dispatch(setLists(userListsArray));
        } else {
          dispatch(setLists([]));
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleModal = () => {
    document.body.classList.add('modal-open');

    setIsNewList((prev) => !prev);
  };

  const favoriteLength = favorite.find((item) => item[0] === 'createdAt')
    ? 0
    : favorite.length;

  const handleModalContent = (
    inputName: string,
    id: number | null,
    now: string
  ) => {
    createNewList(id, inputName);
    setIsNewList(false);
    dispatch(setLists([...lists, [inputName, { createdAt: now }]]));
  };

  return (
    <div className={styles.listBlock}>
      {isNewList && (
        <ModalInput
          setIsNewOne={setIsNewList}
          title="Create a new list"
          act="new list"
          handleContent={handleModalContent}
        />
      )}

      <PageHeader name="My lists" title="list" handleModal={handleModal} />

      <div className={styles.content}>
        <ul className={styles.blocks}>
          <li className={styles.item} key={0}>
            <FavoriteBlock length={favoriteLength} title="favourites" />
          </li>

          {isLoding ? (
            <Skeleton />
          ) : (
            lists.map((item, i) => {
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
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Lists;
