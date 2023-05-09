import { useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import styles from './Word.module.css';

const Category = () => {
  const [showAll, setShowAll] = useState(false);

  const { words } = useSelector((state: RootState) => state.words);

  const nouns = words.results.reduce((all: [string, string[]][], obj) => {
    if (obj.partOfSpeech === 'noun') {
      const synonyms = Array.isArray(obj.synonyms)
        ? obj.synonyms.filter(Boolean)
        : [];

      if (synonyms.length > 3) {
        synonyms.length = 3;
      }

      if (synonyms.length) {
        return all.concat([[obj.definition, synonyms]]);
      }

      return all.concat([[obj.definition, synonyms]]);
    }
    return all;
  }, []);

  const verbs = words.results.reduce((all: [string, string[]][], obj) => {
    if (obj.partOfSpeech === 'verb') {
      const synonyms = Array.isArray(obj.synonyms)
        ? obj.synonyms.filter(Boolean)
        : [];

      if (synonyms.length > 3) {
        synonyms.length = 3;
      }

      if (synonyms.length) {
        return all.concat([[obj.definition, synonyms]]);
      }

      return all.concat([[obj.definition, synonyms]]);
    }
    return all;
  }, []);

  const adjectives = words.results.reduce((all: [string, string[]][], obj) => {
    if (obj.partOfSpeech === 'adjective') {
      const synonyms = Array.isArray(obj.synonyms)
        ? obj.synonyms.filter(Boolean)
        : [];

      if (synonyms.length > 3) {
        synonyms.length = 3;
      }

      if (synonyms.length) {
        return all.concat([[obj.definition, synonyms]]);
      }

      return all.concat([[obj.definition, synonyms]]);
    }
    return all;
  }, []);

  const adverbs = words.results.reduce((all: [string, string[]][], obj) => {
    if (obj.partOfSpeech === 'adverb') {
      const synonyms = Array.isArray(obj.synonyms)
        ? obj.synonyms.filter(Boolean)
        : [];

      if (synonyms.length > 3) {
        synonyms.length = 3;
      }

      if (synonyms.length) {
        return all.concat([[obj.definition, synonyms]]);
      }

      return all.concat([[obj.definition, synonyms]]);
    }
    return all;
  }, []);

  const adjectivesSatellite = words.results.reduce(
    (all: [string, string[]][] | any, obj) => {
      if (obj.partOfSpeech === 'adjective satellite') {
        const synonyms = Array.isArray(obj.synonyms)
          ? obj.synonyms.filter(Boolean)
          : [];

        if (synonyms.length > 3) {
          synonyms.length = 3;
        }

        if (synonyms.length) {
          return all.concat([[obj.definition, synonyms]]);
        }

        return all.concat([[obj.definition, synonyms]]);
      }
      return all;
    },
    []
  );

  const partsOfSpeech = [
    ['noun', nouns],
    ['verb', verbs],
    ['adjective', adjectives],
    ['adverb', adverbs],
    ['adjective satellite', adjectivesSatellite],
  ];

  return (
    <>
      {partsOfSpeech.map((obj, i) => {
        if (obj[1].length >= 1) {
          const [pos, items] = obj;
          const displayItems = showAll ? items : items.slice(0, 5);

          return (
            <div className={styles.list} key={i}>
              <h2>{pos}</h2>

              {displayItems.map((item: [string, string[]], i: number) => (
                <ul key={i}>
                  <li>{item[0]}</li>
                  {item[1].length > 0 &&
                    item[1].map((a: string, i: number) => (
                      <span key={i} className={styles.synonyms}>{`${a}⠀`}</span>
                    ))}
                </ul>
              ))}

              {items.length > 5 && (
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

        return '';
      })}
    </>
  );
};

export default Category;
