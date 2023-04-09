import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addWordToList, removeWordFromList } from '../../config/firebase';
import { useAuth } from '../../hooks/use-auth';
import { getUserList } from '../../config/firebase';

import { BsFillBookmarkFill } from 'react-icons/bs';

import Category from './Category';

// import Examples from './Examples';
import styles from './Word.module.css';

const Word = () => {
  const { words, status } = useSelector((state) => state.words);
  const { id } = useSelector((state) => state.user);

  const { isAuth } = useAuth();

  const [isInList, setIsInList] = useState();

  const toggleIsList = () => {
    isInList
      ? removeWordFromList(id, words.word)
      : addWordToList(id, words.word, words.definitions);

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
      {status === 'success' && (
        <div>
          <div className={styles.top}>
            <div>
              <h1 className={styles.h1}>{words.word}</h1>
              <span>/{words.pronunciation.all}/</span>
            </div>
            {isAuth ? (
              <div className={styles.tab}>
                <button onClick={toggleIsList}>
                  <BsFillBookmarkFill style={{ fill: isInList && '#337139' }} />
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
          {/* {words.examples.length >= 1 && <Examples />} */}
        </div>
      )}
    </div>
  );
};

export default Word;
