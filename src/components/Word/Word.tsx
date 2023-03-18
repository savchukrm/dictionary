import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Category from './Category';

import Examples from './Examples';
import styles from './Word.module.css';

const Word = () => {
  const { words, status } = useSelector((state: RootState) => state.words);

  return (
    <div className={styles.word}>
      {status === 'success' && (
        <div>
          <div className={styles.top}>
            <h1 className={styles.h1}>{words.word}</h1>
            <span>/{words.pronunciation}/</span>
          </div>

          <Category />
          {words.examples.length >= 1 && <Examples />}
        </div>
      )}
    </div>
  );
};

export default Word;
