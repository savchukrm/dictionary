import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { RootState, useAppDispatch } from '../../../redux/store';

import { setFolders } from '../../../redux/folders/slice';

import { changeDescriptionForFolder } from '../../../utils/folders/folders';

import styles from '../ModalInput/ModalInput.module.css';

interface ModalDescriptionProps {
  title: string;
  setModalDescription: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDescription: React.FC<ModalDescriptionProps> = ({
  title,
  setModalDescription,
}) => {
  const dispatch = useAppDispatch();

  const [inputName, setInputName] = useState('');

  const { id } = useSelector((state: RootState) => state.user);
  const { folders } = useSelector((state: RootState) => state.folders);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedFolders = folders.map((folder) => {
      if (folder[0] === title) {
        return [folder[0], { description: inputName }];
      }
      return folder;
    });

    dispatch(setFolders(updatedFolders));

    changeDescriptionForFolder(id, title, inputName);

    document.body.classList.remove('modal-open');
    setModalDescription(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleModal = () => {
    document.body.classList.remove('modal-open');
    setModalDescription(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.block}>
        <div className={styles.top}>
          <h3 className={styles.h3}>Edit description</h3>
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
              maxLength={30}
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

export default ModalDescription;
