import styles from '../../ListBlock/Menu/Menu.module.css';

interface FolderMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setModalChange: React.Dispatch<React.SetStateAction<boolean>>;
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setModalDescription: React.Dispatch<React.SetStateAction<boolean>>;
}

const FolderMenu: React.FC<FolderMenuProps> = ({
  setOpenMenu,
  setModalChange,
  setModalDelete,
  setModalDescription,
}) => {
  const handleModalDelete = () => {
    setOpenMenu(false);
    setModalDelete(true);
  };

  const hanleOpenInput = () => {
    setOpenMenu(false);
    setModalChange(true);
  };

  const handleModalDescription = () => {
    setOpenMenu(false);
    setModalDescription(true);
  };

  return (
    <div className="folderMenu">
      <div onClick={hanleOpenInput} className={styles.item}>
        Edit folder name
      </div>
      <div onClick={handleModalDescription} className={styles.item}>
        Edit description
      </div>
      <div onClick={handleModalDelete} className={styles.item}>
        Delete folder
      </div>
    </div>
  );
};

export default FolderMenu;
