import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { RootState } from '../../../redux/store';

import styles from '../ModalInput/ModalInput.module.css';

interface ModalChangeProps {
  title: string;
  name: string;
  setModalChange: React.Dispatch<React.SetStateAction<boolean>>;
  handleContent: (id: number | null, newName: string, title: string) => void;
}

const ModalChange: React.FC<ModalChangeProps> = ({
  title,
  name,
  handleContent,
  setModalChange,
}) => {
  const [newName, setNewName] = useState('');

  const { id } = useSelector((state: RootState) => state.user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setModalChange(false);

    handleContent(id, newName, title);

    document.body.classList.remove('modal-open');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleModal = () => {
    setModalChange(false);

    document.body.classList.remove('modal-open');
  };

  return (
    <div className={styles.modal}>
      <div className={styles.block}>
        <div className={styles.top}>
          <h3 className={styles.h3}>{`Edit ${name} name`}</h3>
          <button onClick={handleModal} className={styles.smallBtn}>
            <CgClose />
          </button>
        </div>
        <form className={styles.main} onSubmit={handleSubmit}>
          <label>
            {`New ${name} name`}
            <input
              className={styles.formInput}
              type="text"
              maxLength={15}
              placeholder="new name"
              onChange={handleChange}
            />
          </label>
          <input
            disabled={newName.length < 1}
            className={styles.btnConfirm}
            type="submit"
            value="Change"
          />
        </form>
      </div>
    </div>
  );
};

export default ModalChange;
