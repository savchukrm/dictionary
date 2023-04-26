import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { useAuth } from '../../hooks/use-auth';

import { BsFillBookmarkFill } from 'react-icons/bs';

import Category from './Category';

import styles from './Word.module.css';
import PopupMenu from '../Popup/Popup';
import ModalInput from '../ModalInput/ModalInput';

const Word = (): JSX.Element => {
  const { words, status } = useSelector((state: RootState) => state.words);

  const { isAuth } = useAuth();

  const [isNewList, setIsNewList] = useState<boolean>(false);

  return (
    <div className={styles.word}>
      {isNewList && <ModalInput setIsNewList={setIsNewList} />}
      {status === 'success' && words.results && (
        <div>
          <div className={styles.top}>
            <div>
              <h1 className={styles.h1}>{words.word}</h1>
              <span>/{words.pronunciation.all}/</span>
            </div>
            {isAuth ? (
              <div className={styles.tab}>
                <PopupMenu setIsNewList={setIsNewList} />
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
