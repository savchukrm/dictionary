import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { RootState } from '../../redux/store';

import styles from './ModalInput.module.css';

interface ModalProps {
  name: string;
  setIsNewOne: React.Dispatch<React.SetStateAction<boolean>>;
  handleContent: (inputName: string, id: number | null, now: string) => void;
}

const ModalInput: React.FC<ModalProps> = ({
  setIsNewOne,
  name,
  handleContent,
}) => {
  const [inputName, setInputName] = useState('');

  const { id } = useSelector((state: RootState) => state.user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const now = new Date().toISOString();

    handleContent(inputName, id, now);

    document.body.classList.remove('modal-open');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleModal = () => {
    document.body.classList.remove('modal-open');

    setIsNewOne((prev) => !prev);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.block}>
        <div className={styles.top}>
          <h3 className={styles.h3}>{`Create a new ${name}`}</h3>
          <button onClick={handleModal} className={styles.smallBtn}>
            <CgClose />
          </button>
        </div>
        <form className={styles.main} onSubmit={handleSubmit}>
          <label>
            {`${name} name`}
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
            value="Create"
          />
        </form>
      </div>
    </div>
  );
};

export default ModalInput;
