import { useState } from 'react';

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

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

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
          <MenuSet
            setModalSelect={setModalSelect}
            setOpenMenu={setOpenMenu}
            listName={listName}
            word={word}
          />
        )}
      </div>
    </div>
  );
};

export default Set;
