import styles from '../../ListBlock/Menu/Menu.module.css';

interface MenuSetProps {
  setModalSelect: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuSet: React.FC<MenuSetProps> = ({ setModalSelect, setOpenMenu }) => {
  const handleOpenModalSelect = () => {
    setModalSelect(true);
    setOpenMenu(false);
  };

  return (
    <ul className="menuSetBlock">
      <div onClick={handleOpenModalSelect} className={styles.item}>
        Change definition
      </div>
      <div className={styles.item}>Remove word</div>
    </ul>
  );
};

export default MenuSet;
