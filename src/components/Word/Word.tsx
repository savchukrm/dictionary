import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { addWordToList, removeWordFromList } from '../../config/firebase';
import { useAuth } from '../../hooks/use-auth';
import { getUserList } from '../../config/firebase';

import { BsFillBookmarkFill } from 'react-icons/bs';

import Category from './Category';

import styles from './Word.module.css';

const Word = (): JSX.Element => {
  const { words, status } = useSelector((state: RootState) => state.words);
  const { id } = useSelector((state: RootState) => state.user);

  const { isAuth } = useAuth();

  const [isInList, setIsInList] = useState<boolean>();

  const toggleIsList = (): void => {
    isInList
      ? removeWordFromList(id, words.word)
      : addWordToList(id, words.word, words.results);

    setIsInList((prev) => !prev);
  };

  useEffect(() => {
    getUserList(id)
      .then((res) => {
        if (res.val() !== null)
          setIsInList(Object.keys(res.val()).some((el) => el === words.word));
      })
      .catch((error) => console.log(error));
  }, [id, words.word, isInList]);

  return (
    <div className={styles.word}>
      {status === 'success' && words.results && (
        <div>
          <div className={styles.top}>
            <div>
              <h1 className={styles.h1}>{words.word}</h1>
              <span>/{words.pronunciation.all}/</span>
            </div>
            {isAuth ? (
              <div className={styles.tab}>
                <button onClick={toggleIsList}>
                  <BsFillBookmarkFill
                    className={styles.bookmarkIcon}
                    style={{ fill: isInList ? '#337139' : '#525f7f' }}
                  />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <div className={styles.tab}>
                  <BsFillBookmarkFill />
                </div>
              </Link>
            )}
          </div>

          <Category />
        </div>
      )}
    </div>
  );
};

export default Word;
