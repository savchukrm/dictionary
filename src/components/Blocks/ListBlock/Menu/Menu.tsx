import styles from './Menu.module.css';

interface MenuProps {
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setModalChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({
  setModalDelete,
  setOpenMenu,
  setModalChange,
}) => {
  const handleModalDelete = () => {
    setModalDelete(true);
    setOpenMenu(false);
    document.body.classList.add('modal-open');
  };

  const hanleOpenInput = () => {
    setModalChange(true);
    setOpenMenu(false);
    document.body.classList.add('modal-open');
  };

  return (
    <ul className={styles.block}>
      <div onClick={hanleOpenInput} className={styles.item}>
        Edit list name
      </div>
      <div onClick={handleModalDelete} className={styles.item}>
        Delete list
      </div>
    </ul>
  );
};

export default Menu;
