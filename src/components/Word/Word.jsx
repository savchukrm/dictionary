import { useSelector } from 'react-redux';

import styles from './Word.module.css';

const Word = () => {
  const { words, status } = useSelector((state) => state.words);

  const synonyms = words.definitions.reduce(
    (all, obj) => all.concat(obj.synonyms),
    []
  );

  const nouns = words.definitions.reduce((all, obj) => {
    if (obj.partOfSpeech === 'noun') {
      return all.concat(obj.definition, [obj.synonyms]);
    }
    return all;
  }, []);

  console.log(nouns);

  const verbs = words.definitions.reduce((all, obj) => {
    if (obj.partOfSpeech === 'verb') {
      return all.concat(obj.definition);
    }
    return all;
  }, []);

  const adjectives = words.definitions.reduce((all, obj) => {
    if (obj.partOfSpeech === 'adjective') {
      return all.concat(obj.definition);
    }
    return all;
  }, []);

  const adverbs = words.definitions.reduce((all, obj) => {
    if (obj.partOfSpeech === 'adverb') {
      return all.concat(obj.definition);
    }
    return all;
  }, []);

  const adjectivesSatellite = words.definitions.reduce((all, obj) => {
    if (obj.partOfSpeech === 'adjective satellite') {
      return all.concat(obj.definition);
    }
    return all;
  }, []);

  const partsOfSpeech = [
    ['noun', nouns],
    ['verb', verbs],
    ['adjective', adjectives],
    ['adverb', adverbs],
    ['adjective satellite', adjectivesSatellite],
  ];

  return (
    <div className={styles.word}>
      {status === 'success' && (
        <div>
          <div className={styles.top}>
            <h1 className={styles.h1}>{words.word}</h1>
            <span>/{words.pronunciation}/</span>
          </div>
          {partsOfSpeech.map((obj, i) => {
            if (obj[1].length >= 1) {
              return (
                <div className={styles.list} key={i}>
                  <h2>{obj[0]}</h2>
                  <ul>
                    {obj[1].map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            }
            return '';
          })}
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
