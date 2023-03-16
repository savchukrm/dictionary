import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import styles from './Word.module.css';

function Examples() {
  const [showAll, setShowAll] = useState(false);

  const { words } = useSelector((state: RootState) => state.words);

  const maxExamples = 5;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedExamples = showAll
    ? words.examples
    : words.examples.slice(0, maxExamples);

  return (
    <div className={styles.examples}>
      <h3 className={styles.h3}>Examples</h3>
      <ul>
        {displayedExamples.map((obj, i) => (
          <li key={i}> {obj} </li>
        ))}
      </ul>
      {words.examples.length > maxExamples && (
        <div>
          <button className={styles.btn} onClick={toggleShowAll}>
            {showAll ? 'see less' : 'see more'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Examples;
