import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../redux/store';

import { setLists } from '../../redux/lists/slice';
import { setFavorite } from '../../redux/favorite/slice';

import { getUserFavorite } from '../../utils/favorite/favorite';
import { getUserLists } from '../../utils/lists/list';

import Search from '../../components/Search/Search';
import Image from '../../components/Image';
import Word from '../../components/Word/Word';
import Requests from '../../components/PreviousRequests/Requests';

import styles from './Main.module.css';

const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { status, words } = useSelector((state: RootState) => state.words);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id !== null) {
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
    }
  }, [id]);

  useEffect(() => {
    if (id !== null) {
      getUserFavorite(id)
        .then((res) => {
          if (res.val() != null) {
            dispatch(setFavorite(Object.entries(res.val())));
          }
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  return (
    <div className="box">
      <div className={styles.main}>
        <div className="container">
          <Search />

          {id !== null && <Requests />}

          {status === 'success' && words.results && <Word />}

          <Image />
        </div>
      </div>
    </div>
  );
};

export default Main;
