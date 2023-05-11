import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { RootState, useAppDispatch } from '../../../redux/store';

import { setFolders } from '../../../redux/folders/slice';

import { addDescriptionToFolder } from '../../../utils/folders/folders';

import styles from '../../ModalInput/ModalInput.module.css';

interface ModalAddProps {
  title: string;
  visibleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAdd: React.FC<ModalAddProps> = ({ title, visibleModal }) => {
  const dispatch = useAppDispatch();

  const [inputName, setInputName] = useState('');

  const { id } = useSelector((state: RootState) => state.user);
  const { folders } = useSelector((state: RootState) => state.folders);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedFolders = folders.map((folder) => {
      if (folder[0] === title) {
        return [
          folder[0],
          {
            description: inputName,
          },
        ];
      }
      return folder;
    });

    dispatch(setFolders(updatedFolders));

    addDescriptionToFolder(id, title, inputName);

    document.body.classList.remove('modal-open');
    visibleModal(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleModal = () => {
    document.body.classList.remove('modal-open');
    visibleModal(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.block}>
        <div className={styles.top}>
          <h3 className={styles.h3}>Add description</h3>
          <button onClick={handleModal} className={styles.smallBtn}>
            <CgClose />
          </button>
        </div>
        <form className={styles.main} onSubmit={handleSubmit}>
          <label>
            description
            <input
              className={styles.formInput}
              type="text"
              placeholder="write here"
              maxLength={50}
              onChange={handleChange}
            />
          </label>
          <input
            disabled={inputName.length < 1}
            className={styles.btnConfirm}
            type="submit"
            value="Confirm"
          />
        </form>
      </div>
    </div>
  );
};

export default ModalAdd;
