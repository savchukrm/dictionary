import { useSelector } from 'react-redux';

import { IoMdClose } from 'react-icons/io';

import { RootState, useAppDispatch } from '../../../../redux/store';
import { setLists } from '../../../../redux/lists/slice';

import { removeListFromLists } from '../../../../utils/lists/list';

import styles from './ModalDelete.module.css';

interface ModalDeleteProps {
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ setModalDelete, title }) => {
  const dispatch = useAppDispatch();

  const { id } = useSelector((state: RootState) => state.user);
  const { lists } = useSelector((state: RootState) => state.lists);

  const handleCloseModal = () => {
    setModalDelete(false);

    document.body.classList.remove('modal-open');
  };

  const handleDeleteList = () => {
    const newList = lists.filter((item) => item[0] !== title);
    dispatch(setLists(newList));
    removeListFromLists(id, title);

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
          <h2>Delete list</h2>
        </div>

        <div className={styles.main}>
          <div className={styles.warn}>
            <p>Do you really wish to delete your list?</p>
            <p>Please note that your data will be lost.</p>
          </div>
          <p className={styles.alert}>This action cannot be undone.</p>
        </div>

        <div className={styles.blockBtn}>
          <button onClick={handleDeleteList} className={styles.btnDelete}>
            delete list
          </button>
          <button onClick={handleCloseModal} className={styles.btnKeep}>
            keep list
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
