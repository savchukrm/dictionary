import styles from './Menu.module.css';

interface MenuProps {
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({
  setModalDelete,
  setOpenModal,
  setModalChange,
}) => {
  const handleModalDelete = () => {
    document.body.classList.add('modal-open');

    setModalDelete(true);
    setOpenModal(false);
  };

  const hanleOpenInput = () => {
    document.body.classList.add('modal-open');

    setModalChange(true);
    setOpenModal(false);
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
