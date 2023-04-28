import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BsFillBookmarkFill } from 'react-icons/bs';

import { RootState } from '../../redux/store';
import { useAuth } from '../../hooks/use-auth';

import Category from './Category';

import styles from './Word.module.css';
import PopupMenu from '../Popup/Popup';

const Word = (): JSX.Element => {
  const { isAuth } = useAuth();

  const { words, status } = useSelector((state: RootState) => state.words);

  return (
    <div className={styles.word}>
      {status === 'success' && words.results && (
        <div>
          <div className={styles.top}>
            <div>
              <h1 className={styles.h1}>{words.word}</h1>
              <span>
                {words.pronunciation ? `/${words.pronunciation.all}/` : ''}
              </span>
            </div>
            {isAuth ? (
              <div className={styles.tab}>
                <PopupMenu />
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
