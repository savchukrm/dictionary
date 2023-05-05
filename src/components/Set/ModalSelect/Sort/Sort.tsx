import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../redux/store';

import { getWordFromList } from '../../../../utils/firebase';

import styles from './Sort.module.css';

type DefinitionsItem = {
  definition: string;
  partOfSpeech: string;
};

interface SortProps {
  content: DefinitionsItem[];
  listName: string | undefined;
  word: string;
}

const Sort: React.FC<SortProps> = ({ content, listName, word }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const { id } = useSelector((state: RootState) => state.user);

  const updateDefinition = () => {
    getWordFromList(id, listName, word);
  };

  const nouns = content.reduce((all: string[], obj) => {
    if (obj.partOfSpeech === 'noun') {
      all.push(obj.definition);
    }
    return all;
  }, []);

  const verbs = content.reduce((all: string[], obj) => {
    if (obj.partOfSpeech === 'verb') {
      all.push(obj.definition);
    }
    return all;
  }, []);

  const adjectives = content.reduce((all: string[], obj) => {
    if (obj.partOfSpeech === 'adjective') {
      all.push(obj.definition);
    }
    return all;
  }, []);

  const adverbs = content.reduce((all: string[], obj) => {
    if (obj.partOfSpeech === 'adverb') {
      all.push(obj.definition);
    }
    return all;
  }, []);

  const adjectivesSatellite = content.reduce((all: string[], obj) => {
    if (obj.partOfSpeech === 'adjective satellite') {
      all.push(obj.definition);
    }
    return all;
  }, []);

  const partsOfSpeech = [
    ['verb', verbs],
    ['noun', nouns],
    ['adjective', adjectives],
    ['adverb', adverbs],
    ['adjective satellite', adjectivesSatellite],
  ];

  return (
    <div>
      {partsOfSpeech.map((obj, i) => {
        const [part, items] = obj;
        if (items.length >= 1) {
          const displayItems = showAll ? items : items.slice(0, 3);

          return (
            <div className={styles.block} key={i}>
              <h4>{part}</h4>

              <div className={styles.wrapper}>
                <ul className={styles.main}>
                  {typeof displayItems === 'object' &&
                    displayItems.map((item, i: number) => (
                      <label key={i}>
                        <input
                          type="radio"
                          name="item"
                          value={item}
                          checked={selectedItem === item}
                          onChange={(event) =>
                            setSelectedItem(event.target.value)
                          }
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                </ul>

                {items.length > 3 && (
                  <div>
                    <button
                      className={styles.btnMore}
                      onClick={() => setShowAll(!showAll)}
                    >
                      {showAll
                        ? 'See less definitions'
                        : 'See more definitions'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        }

        return '';
      })}
      <button className={styles.btnUpdate} onClick={updateDefinition}>
        Update Definition
      </button>
    </div>
  );
};

export default Sort;
