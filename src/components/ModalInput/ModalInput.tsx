import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { RootState, useAppDispatch } from '../../redux/store';
import { createNewList } from '../../utils/firebase';
import { setLists } from '../../redux/lists/slice';

import styles from './ModalInput.module.css';

interface ModalProps {
  setIsNewList: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalInput: React.FC<ModalProps> = ({ setIsNewList }) => {
  const dispatch = useAppDispatch();

  const [inputName, setInputName] = useState('');

  const { id } = useSelector((state: RootState) => state.user);
  const { lists } = useSelector((state: RootState) => state.lists);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const now = new Date().toISOString();

    createNewList(id, inputName);
    setIsNewList(false);
    dispatch(setLists([...lists, [inputName, { createdAt: now }]]));

    document.body.classList.remove('modal-open');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleModal = () => {
    document.body.classList.remove('modal-open');

    setIsNewList((prev) => !prev);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.block}>
        <div className={styles.top}>
          <h3 className={styles.h3}>Create a new list</h3>
          <button onClick={handleModal} className={styles.smallBtn}>
            <CgClose />
          </button>
        </div>
        <form className={styles.main} onSubmit={handleSubmit}>
          <label>
            List name
            <input
              className={styles.formInput}
              type="text"
              placeholder="e.g. 'Family'"
              onChange={handleChange}
            />
          </label>
          <input
            disabled={inputName.length < 1}
            className={styles.btnConfirm}
            type="submit"
            value="Create list"
          />
        </form>
      </div>
    </div>
  );
};

export default ModalInput;
