import React from 'react';

import styles from './Menu.module.css';

interface MenuProps {
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ setModalDelete, setOpenModal }) => {
  const handleModalDelete = () => {
    setModalDelete(true);
    setOpenModal(false);
  };
  return (
    <ul className={styles.block}>
      <div className={styles.item}>Edit list name</div>
      <div onClick={handleModalDelete} className={styles.item}>
        Delete list
      </div>
    </ul>
  );
};

export default Menu;
