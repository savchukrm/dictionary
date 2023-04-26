import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { RootState } from '../../redux/store';
import { createNewList } from '../../config/firebase';

import styles from './ModalInput.module.css';

interface ModalProps {
  setIsNewList: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalInput: React.FC<ModalProps> = ({ setIsNewList }) => {
  const [inputName, setInputName] = useState('');

  const { id } = useSelector((state: RootState) => state.user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNewList(id, inputName);
    setIsNewList(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleModal = () => {
    setIsNewList((prev) => !prev);
  };

  return (
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
          className={styles.btnConfirm}
          type="submit"
          value="Create list"
        />
      </form>
    </div>
  );
};

export default ModalInput;
