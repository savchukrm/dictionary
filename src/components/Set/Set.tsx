import { useState, useEffect, useRef } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

import MenuSet from './Menu/MenuSet';
import ModalSelect from './ModalSelect/ModalSelect';

import styles from './Set.module.css';

interface SetProps {
  word: string;
  definition: string;
  content: any;
}

const Set: React.FC<SetProps> = ({ word, definition, content }) => {
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
          word={word}
          setModalSelect={setModalSelect}
          content={content}
        />
      )}

      <div className={styles.setBlock}>
        <h3>{word}</h3>
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
