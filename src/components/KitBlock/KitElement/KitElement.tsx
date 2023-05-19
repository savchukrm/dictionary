import { useState } from 'react';

import SettingBtn from '../../SettingBtn/SettingBtn';

import styles from '../KitBlock.module.css';
import KitMenu from './KitMenu/KitMenu';

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

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div className={styles.box}>
      <div className={styles.block}>
        <div className={`${styles.item} ${styles.term}`}>
          <p>{definition}</p>
        </div>
        <div className={`${styles.item} ${styles.definition}`}>
          <p>{meaning}</p>
        </div>
      </div>
      <div className={styles.btnSetting}>
        <SettingBtn
          openMenu={openMenu}
          handleOpen={handleOpenMenu}
          handleClose={handleCloseMenu}
        />
      </div>

      {openMenu && <KitMenu index={index} folderName={folderName} />}
    </div>
  );
};

export default KitElement;
