import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IoMdArrowRoundBack } from 'react-icons/io';

import { RootState, useAppDispatch } from '../../redux/store';

import { getUserFavorite } from '../../utils/firebase';
import { setFavorite, clearFavorite } from '../../redux/favorite/slice';

import Set from '../../components/Set/Set';

import styles from './ListContent.module.css';

const Favourite = () => {
  const dispatch = useAppDispatch();

  const { favorite } = useSelector((state: RootState) => state.favorite);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getUserFavorite(id)
      .then((res) => {
        if (res.val() != null) {
          dispatch(setFavorite(Object.entries(res.val())));
        }
      })
      .catch((error) => console.log(error));
  }, [dispatch, id]);

  return (
    <div className={styles.content}>
      <div className={styles.top}>
        <Link to="/lists">
          <button className="btnBack">
            <IoMdArrowRoundBack />
            All lists
          </button>
        </Link>
        <h1>Favourites</h1>
      </div>

      <ul className={styles.contentBlock}>
        {favorite.map((item, i) => {
          const [word, content]: [string, any] = item;

          const definition = content[0].definition;

          return (
            <li key={i}>
              {word === 'createdAt' ? (
                <p>You do not have any saved items in the current list</p>
              ) : (
                <Set word={word} definition={definition} content={content} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Favourite;
