import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { RootState, useAppDispatch } from '../../../redux/store';

import { addNewTermToFolder } from '../../../utils/folders/folders';

import { setFolder } from '../../../redux/folder/slice';

import styles from './ModalCreate.module.css';

interface ModalCreateProps {
  folderName: string | undefined;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreate: React.FC<ModalCreateProps> = ({ setModal, folderName }) => {
  const dispatch = useAppDispatch();

  const [definition, setDefinition] = useState('');
  const [meaning, setMeaning] = useState('');

  const { id } = useSelector((state: RootState) => state.user);
  const folder = useSelector((state: RootState) => state.folder);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedFolder = {
      description: '',
      terms: folder.terms
        ? [
            ...folder.terms,
            {
              meaning,
              definition,
            },
          ]
        : [
            {
              meaning,
              definition,
            },
          ],
    };

    dispatch(setFolder(updatedFolder));
    addNewTermToFolder(id, folderName, meaning, definition);

    setMeaning('');
    setDefinition('');
  };

  const handleChangeDefinition = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDefinition(event.target.value);
  };

  const handleChangeMeaning = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
          <label className={styles.inputsContainer}>
            <textarea
              placeholder="Enter term"
              value={definition}
              onChange={handleChangeDefinition}
              className={styles.input}
            ></textarea>
            <textarea
              placeholder="Enter definition"
              value={meaning}
              onChange={handleChangeMeaning}
              className={styles.input}
            ></textarea>
          </label>
          <input
            disabled={meaning.length < 1 || definition.length < 1}
            type="submit"
            value="Confirm"
            className={styles.btnConfirm}
          />
        </form>
      </div>
    </div>
  );
};

export default ModalCreate;
