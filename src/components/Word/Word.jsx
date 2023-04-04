import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addWordToList } from '../../config/firebase';
import { useAuth } from '../../hooks/use-auth';

import { BsFillBookmarkFill } from 'react-icons/bs';

import Category from './Category';

import Examples from './Examples';
import styles from './Word.module.css';

const Word = () => {
  const { words, status } = useSelector((state) => state.words);
  const { id } = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.list);

  const { isAuth } = useAuth();

  const toggleIsList = () => {
    addWordToList(id, words.word, words.definitions);
  };

  const isWordInList = list.map((el) => el[0]).includes(words.word);

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
              <div className={styles.tab}>
                <button onClick={toggleIsList}>
                  <BsFillBookmarkFill
                    style={{ fill: isWordInList && '#337139' }}
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
          {words.examples.length >= 1 && <Examples />}
        </div>
      )}
    </div>
  );
};

export default Word;
