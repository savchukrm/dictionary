import { useState } from 'react';

import { useSelector } from 'react-redux';

import styles from './Word.module.css';

const Category = () => {
  const [showAll, setShowAll] = useState(false);

  const { words } = useSelector((state) => state.words);

  const nouns = words.definitions.reduce((all, obj) => {
    if (obj.partOfSpeech === 'noun') {
      const synonyms = Array.isArray(obj.synonyms)
        ? obj.synonyms
        : [obj.synonyms];
      return all.concat([[obj.definition, synonyms]]);
    }
    return all;
  }, []);

  const verbs = words.definitions.reduce((all, obj) => {
    if (obj.partOfSpeech === 'verb') {
      const synonyms = Array.isArray(obj.synonyms)
        ? obj.synonyms
        : [obj.synonyms];
      return all.concat([[obj.definition, synonyms]]);
    }
    return all;
  }, []);

  const adjectives = words.definitions.reduce((all, obj) => {
    if (obj.partOfSpeech === 'adjective') {
      const synonyms = Array.isArray(obj.synonyms)
        ? obj.synonyms
        : [obj.synonyms];
      return all.concat([[obj.definition, synonyms]]);
    }
    return all;
  }, []);

  const adverbs = words.definitions.reduce((all, obj) => {
    if (obj.partOfSpeech === 'adverb') {
      const synonyms = Array.isArray(obj.synonyms)
        ? obj.synonyms
        : [obj.synonyms];
      return all.concat([[obj.definition, synonyms]]);
    }
    return all;
  }, []);

  const adjectivesSatellite = words.definitions.reduce((all, obj) => {
    if (obj.partOfSpeech === 'adjective satellite') {
      const synonyms = Array.isArray(obj.synonyms)
        ? obj.synonyms
        : [obj.synonyms];
      return all.concat([[obj.definition, synonyms]]);
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
    <>
      {' '}
      {partsOfSpeech.map((obj, i) => {
        if (obj[1].length >= 1) {
          return (
            <div className={styles.list} key={i}>
              <h2>{obj[0]}</h2>

              {obj[1].slice(0, showAll ? obj[1].length : 5).map((item, i) => (
                <ul key={i}>
                  <li>{item[0]}</li>
                  {item[1].length > 0 &&
                    item[1].map((a, i) => (
                      <span
                        key={i}
                        className={styles.synonyms}
                      >{`${a}; `}</span>
                    ))}
                </ul>
              ))}

              {obj[1].length > 5 && (
                <div className={styles.btnBlock}>
                  <button
                    className={styles.btn}
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? 'See less' : 'See more'}
                  </button>
                </div>
              )}
            </div>
          );
        }
      })}
    </>
  );
};

export default Category;
