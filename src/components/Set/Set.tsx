import { useState, useRef, useEffect } from 'react';

import MenuSet from './Menu/MenuSet';
import ModalSelect from './ModalSelect/ModalSelect';
import SettingBtn from '../SettingBtn/SettingBtn';

import styles from './Set.module.css';

import { DefinitionsItem } from '../../redux/words/types';
import ModalChangeWord from '../Modals/ModalChangeWord/ModalChangeWord';

interface SetProps {
  listName: string | undefined;
  word: string;
  definition: string;
  meanings: DefinitionsItem[];
  pronunciation: { all: string };
}

const Set: React.FC<SetProps> = ({
  listName,
  word,
  definition,
  meanings,
  pronunciation,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [modalSelect, setModalSelect] = useState(false);
  const [modalChangeWord, setModalChangeWord] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenMenu((prev) => !prev);
  };

  const handleCloseMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenMenu((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={styles.setBlock}>
        <h3>{word}</h3>

        {pronunciation && <span>/{pronunciation.all}/</span>}

        <p className={styles.definition}>{definition}</p>

        <div className={styles.btn}>
          <SettingBtn
            openMenu={openMenu}
            handleOpen={handleOpenMenu}
            handleClose={handleCloseMenu}
          />
        </div>

        {openMenu && (
          <div ref={popupRef}>
            <MenuSet
              word={word}
              listName={listName}
              setOpenMenu={setOpenMenu}
              setModalSelect={setModalSelect}
              setModalChangeWord={setModalChangeWord}
            />
          </div>
        )}

        {modalSelect && (
          <ModalSelect
            word={word}
            content={meanings}
            listName={listName}
            pronunciation={pronunciation}
            setModalSelect={setModalSelect}
          />
        )}

        {modalChangeWord && (
          <ModalChangeWord
            word={word}
            listName={listName}
            setModal={setModalChangeWord}
          />
        )}
      </div>
    </div>
  );
};

export default Set;
