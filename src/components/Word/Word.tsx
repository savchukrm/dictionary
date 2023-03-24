import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { addWordToList } from '../../config/firebase';
import { useAuth } from '../../hooks/use-auth';

import { BsFillBookmarkFill } from 'react-icons/bs';

import Category from './Category';

import Examples from './Examples';
import styles from './Word.module.css';

const Word = () => {
  const { words, status } = useSelector((state: RootState) => state.words);
  const { id } = useSelector((state: RootState) => state.user);

  const { isAuth } = useAuth();

  const toggleIsList = () => {
    addWordToList(id, words.word, words.definitions);
  };

  const toggleSuggest = () => {};

  return (
    <div className={styles.word}>
      {status === 'success' && (
        <div>
          <div className={styles.top}>
            <div>
              <h1 className={styles.h1}>{words.word}</h1>
              <span>/{words.pronunciation}/</span>
            </div>
            {isAuth ? (
              <button className={styles.tab} onClick={toggleIsList}>
                <BsFillBookmarkFill />
              </button>
            ) : (
              <Link to="/login">
                <div className={styles.tab} onClick={toggleSuggest}>
                  <BsFillBookmarkFill />
                </div>
              </Link>
            )}
          </div>

          <Category />
          {words.examples.length >= 1 && <Examples />}
        </div>
      )}
    </div>
  );
};

export default Word;
