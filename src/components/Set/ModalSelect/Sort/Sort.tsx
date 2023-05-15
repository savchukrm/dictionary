import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../../../redux/store';

import { updateMainDefinitionOnList } from '../../../../utils/lists/list';
import { updateMainDefinitionOnFavorite } from '../../../../utils/favorite/favorite';

import { setList } from '../../../../redux/list/slice';
import { setFavorite } from '../../../../redux/favorite/slice';

import styles from './Sort.module.css';

type DefinitionsItem = {
  definition: string;
  partOfSpeech: string;
};

interface SortProps {
  content: DefinitionsItem[];
  listName: string | undefined;
  word: string;
  setModalSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sort: React.FC<SortProps> = ({
  content,
  listName,
  word,
  setModalSelect,
}) => {
  const dispatch = useAppDispatch();

  const [showAll, setShowAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const { id } = useSelector((state: RootState) => state.user);
  const { list } = useSelector((state: RootState) => state.list);
  const { favorite } = useSelector((state: RootState) => state.favorite);

  const updateCurrentList = () => {
    updateMainDefinitionOnList(id, listName, word, selectedItem);

    const updatedDefinition = list.map((el) => {
      const [term, content] = el;
      if (term === word) {
        return [term, [content[0], content[1], selectedItem]];
      } else {
        return el;
      }
    });

    dispatch(setList(updatedDefinition));
  };

  const updateFavoriteList = () => {
    updateMainDefinitionOnFavorite(id, word, selectedItem);

    const updatedDefinition = favorite.map((el) => {
      const [term, content] = el;
      if (term === word) {
        return [term, [content[0], content[1], selectedItem]];
      } else {
        return el;
      }
    });

    dispatch(setFavorite(updatedDefinition));
  };

  const updateDefinition = () => {
    listName === 'favorite' ? updateFavoriteList() : updateCurrentList();

    setModalSelect(false);
    document.body.classList.remove('modal-open');
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
