import { useState, useRef, useEffect } from 'react';

import SettingBtn from '../../../SettingBtn/SettingBtn';
import KitMenu from './KitMenu/KitMenu';

import styles from '../KitBlock.module.css';

interface KitElementProps {
  index: number;
  meaning: string;
  definition: string;
  folderName: string | undefined;
}

const KitElement: React.FC<KitElementProps> = ({
  index,
  meaning,
  definition,
  folderName,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
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
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      !event.defaultPrevented
    ) {
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
    <div className={styles.box}>
      <div className={styles.block}>
        <div className={`${styles.item} ${styles.term}`}>
          <p className={styles.text}>{definition}</p>
        </div>
        <div className={`${styles.item} ${styles.definition}`}>
          <p className={styles.text}>{meaning}</p>
        </div>
      </div>
      <div className={styles.btnSetting}>
        <SettingBtn
          openMenu={openMenu}
          handleOpen={handleOpenMenu}
          handleClose={handleCloseMenu}
        />
      </div>

      {openMenu && (
        <div ref={popupRef}>
          <KitMenu
            index={index}
            folderName={folderName}
            setOpenMenu={setOpenMenu}
          />
        </div>
      )}
    </div>
  );
};

export default KitElement;
