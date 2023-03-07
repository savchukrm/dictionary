import { useSelector } from 'react-redux';

import styles from './Word.module.css';

const Word = () => {
  const { words, status } = useSelector((state) => state.words);

  const synonyms = words.definitions.reduce(
    (all, obj) => all.concat(obj.synonyms),
    []
  );

  return (
    <div className={styles.word}>
      {status === 'success' && (
        <div>
          <h1>{words.word}</h1>
          <h2>Definisions</h2>
          {words.definitions.map((obj, i) => (
            <li key={i}> {obj.definition} </li>
          ))}
          <h2>Synonums</h2>
          {synonyms.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
          <h2>Examples</h2>
          {words.examples.map((obj, i) => (
            <li key={i}> {obj} </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Word;
