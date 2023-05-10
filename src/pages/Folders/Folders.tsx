import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';

import { RootState, useAppDispatch } from '../../redux/store';

import { createNewFolder } from '../../utils/folders/folders';
import { setFolders } from '../../redux/folders/slice';

import ModalInput from '../../components/ModalInput/ModalInput';

import styles from './Folders.module.css';

const Folders = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { folders } = useSelector((state: RootState) => state.folders);

  const [isNewFolder, setIsNewFolder] = useState<boolean>(false);

  const handleModal = () => {
    document.body.classList.add('modal-open');

    setIsNewFolder((prev) => !prev);
  };

  const handleModalContent = (
    inputName: string,
    id: number | null,
    now: string
  ) => {
    createNewFolder(id, inputName);
    setIsNewFolder(false);
    dispatch(setFolders([...folders, [inputName, { createdAt: now }]]));
  };

  return (
    <div className={styles.folderBlock}>
      {isNewFolder && (
        <ModalInput
          setIsNewOne={setIsNewFolder}
          name={'folder'}
          handleContent={handleModalContent}
        />
      )}

      <div className="header">
        <Link to="/">
          <button className="btnBack">
            <IoMdArrowRoundBack />
            return
          </button>
        </Link>

        <h1>Folders</h1>

        <button onClick={handleModal} className="btnAdd">
          new folder
        </button>
      </div>
    </div>
  );
};

export default Folders;
