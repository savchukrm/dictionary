import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { useAuth } from '../../hooks/use-auth';

import { BsFillBookmarkFill } from 'react-icons/bs';

import Category from './Category';

import styles from './Word.module.css';
import PopupMenu from '../Popup/Popup';

const Word = (): JSX.Element => {
  const { words, status } = useSelector((state: RootState) => state.words);

  const { isAuth } = useAuth();

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
