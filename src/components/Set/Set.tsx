import { useState } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

import MenuSet from './Menu/MenuSet';
import ModalSelect from './ModalSelect/ModalSelect';

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

        {!openMenu ? (
          <button onClick={handleOpenMenu} className={styles.btn}>
            <BsThreeDotsVertical />
          </button>
        ) : (
          <button onClick={handleCloseMenu} className={styles.btn}>
            <IoMdClose />
          </button>
        )}

        {openMenu && (
          <MenuSet setModalSelect={setModalSelect} setOpenMenu={setOpenMenu} />
        )}
      </div>
    </div>
  );
};

export default Set;
