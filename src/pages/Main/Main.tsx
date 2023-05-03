import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../redux/store';

import { setLists } from '../../redux/lists/slice';
import { setFavorite, clearFavorite } from '../../redux/favorite/slice';

import { getUserLists, getUserFavorite } from '../../utils/firebase';

import Search from '../../components/Search/Search';
import Image from '../../components/Image';
import Word from '../../components/Word/Word';

import styles from './Main.module.css';

const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { status, words } = useSelector((state: RootState) => state.words);
  const { id } = useSelector((state: RootState) => state.user);

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

  useEffect(() => {
    getUserFavorite(id)
      .then((res) => {
        if (res.val() != null) {
          dispatch(setFavorite(Object.entries(res.val())));
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className={styles.main}>
      <div className="container">
        <Search />
        {status === 'success' && words.results && <Word />}
        <Image />
      </div>
    </div>
  );
};

export default Main;
