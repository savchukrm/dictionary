import { useState, useRef, useEffect } from 'react';

import MenuSet from './Menu/MenuSet';
import ModalSelect from './ModalSelect/ModalSelect';
import SettingBtn from '../SettingBtn/SettingBtn';

import styles from './Set.module.css';

import { DefinitionsItem } from '../../redux/words/types';

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
      {modalSelect && (
        <ModalSelect
          listName={listName}
          word={word}
          setModalSelect={setModalSelect}
          content={meanings}
          pronunciation={pronunciation}
        />
      )}

      <div className={styles.setBlock}>
        <h3>{word}</h3>
        {pronunciation && <span>/{pronunciation.all}/</span>}

        <p>{definition}</p>

        <div className={styles.btn}>
          <SettingBtn
            openMenu={openMenu}
            handleClose={handleCloseMenu}
            handleOpen={handleOpenMenu}
          />
        </div>

        {openMenu && (
          <div ref={popupRef}>
            <MenuSet
              setModalSelect={setModalSelect}
              setOpenMenu={setOpenMenu}
              listName={listName}
              word={word}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Set;
