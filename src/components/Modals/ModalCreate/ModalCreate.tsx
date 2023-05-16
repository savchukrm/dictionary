import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { RootState } from '../../../redux/store';

import { addNewTermToFolder } from '../../../utils/folders/folders';

import styles from './ModalCreate.module.css';

interface ModalCreateProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreate: React.FC<ModalCreateProps> = ({ setModal }) => {
  const [definition, setDefinition] = useState('');
  const [meaning, setMeaning] = useState('');

  const { id } = useSelector((state: RootState) => state.user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addNewTermToFolder(id, 'dd', definition, meaning);

    setMeaning('');
    setDefinition('');
  };

  const handleChangeDefinition = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDefinition(event.target.value);
  };

  const handleChangeMeaning = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeaning(event.target.value);
  };

  const closeModal = () => {
    document.body.classList.remove('modal-open');
    setModal(false);
  };

  return (
    <div className="modal">
      <div className={styles.block}>
        <div className={styles.top}>
          <h3 className={styles.h3}>Add new term</h3>
          <button onClick={closeModal} className={styles.smallBtn}>
            <CgClose />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="definition"
              value={definition}
              onChange={handleChangeDefinition}
            />
            <input
              type="text"
              placeholder="maening"
              value={meaning}
              onChange={handleChangeMeaning}
            />
          </label>
          <input
            disabled={meaning.length < 1 || definition.length < 1}
            type="submit"
            value="Confirm"
          />
        </form>
      </div>
    </div>
  );
};

export default ModalCreate;
