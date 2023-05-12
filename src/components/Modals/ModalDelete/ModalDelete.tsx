import { useSelector } from 'react-redux';

import { IoMdClose } from 'react-icons/io';

import { RootState } from '../../../redux/store';

import styles from './ModalDelete.module.css';

interface ModalDeleteProps {
  title: string;
  name: string;
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteOne: (id: number | null, title: string) => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  title,
  name,
  setModalDelete,
  handleDeleteOne,
}) => {
  const { id } = useSelector((state: RootState) => state.user);

  const handleCloseModal = () => {
    setModalDelete(false);

    document.body.classList.remove('modal-open');
  };

  const handleDeleteList = () => {
    handleDeleteOne(id, title);

    setModalDelete(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <div className="modal">
      <div className={styles.content}>
        <div className={styles.head}>
          <button onClick={handleCloseModal} className={styles.btnClose}>
            <IoMdClose />
          </button>
          <h2>{`Delete ${name}`}</h2>
        </div>

        <div className={styles.main}>
          <div className={styles.warn}>
            <p>{`Do you really wish to delete your ${name}?`}</p>
            <p>Please note that your data will be lost.</p>
          </div>
          <p className={styles.alert}>This action cannot be undone.</p>
        </div>

        <div className={styles.blockBtn}>
          <button onClick={handleDeleteList} className={styles.btnDelete}>
            {`delete ${name}`}
          </button>
          <button onClick={handleCloseModal} className={styles.btnKeep}>
            {`keep ${name}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
