import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { RootState, useAppDispatch } from '../../../redux/store';

import {
  updateDefinition,
  updateMeaning,
} from '../../../utils/folders/folders';

import { setFolder } from '../../../redux/folder/slice';

import styles from './ModalChangeKit.module.css';

interface ModalChangeKitProps {
  name: string;
  index: number;
  folderName: string | undefined;
  closeModal: () => void;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalChangeKit: React.FC<ModalChangeKitProps> = ({
  name,
  index,
  closeModal,
  folderName,
  setOpenMenu,
}) => {
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState('');

  const { id } = useSelector((state: RootState) => state.user);
  const folder = useSelector((state: RootState) => state.folder);

  const changeDefinition = () => {
    if (index >= 0 && index < folder.terms.length) {
      const updatedTerms = [...folder.terms];
      updatedTerms[index] = {
        ...updatedTerms[index],
        definition: term,
      };

      const updatedFolder = {
        ...folder,
        terms: updatedTerms,
      };

      dispatch(setFolder(updatedFolder));
    }

    updateDefinition(id, folderName, index, term);
  };

  const changeMeaning = () => {
    if (index >= 0 && index < folder.terms.length) {
      const updatedTerms = [...folder.terms];
      updatedTerms[index] = {
        ...updatedTerms[index],
        meaning: term,
      };

      const updatedFolder = {
        ...folder,
        terms: updatedTerms,
      };

      dispatch(setFolder(updatedFolder));
    }

    updateMeaning(id, folderName, index, term);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    name === 'meaning' ? changeMeaning() : changeDefinition();

    setTerm('');
    closeModal();
    setOpenMenu(false);

    document.body.classList.remove('modal-open');
  };

  const handleChangeTerm = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTerm(event.target.value);
  };

  return (
    <div className="modal">
      <div className={styles.block}>
        <div className={styles.top}>
          <h3 className={styles.h3}>{`Change ${name}`}</h3>
          <button onClick={closeModal} className={styles.smallBtn}>
            <CgClose />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            <textarea
              placeholder={`Enter new ${name}`}
              value={term}
              onChange={handleChangeTerm}
              className={styles.input}
            ></textarea>
          </label>

          <input
            disabled={term.length < 1}
            type="submit"
            value={`Change`}
            className={styles.btnConfirm}
          />
        </form>
      </div>
    </div>
  );
};

export default ModalChangeKit;
