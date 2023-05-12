import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';

import { RootState, useAppDispatch } from '../../redux/store';

import { createNewFolder, getUserFolders } from '../../utils/folders/folders';
import { setFolders } from '../../redux/folders/slice';

import FolderBlock from '../../components/FolderBlock/FolderBlock';
import ModalInput from '../../components/Modals/ModalInput/ModalInput';
import Skeleton from '../../components/Skeleton/Skeleton';

import styles from './Folders.module.css';

const Folders = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { id } = useSelector((state: RootState) => state.user);
  const { folders } = useSelector((state: RootState) => state.folders);

  const [isNewFolder, setIsNewFolder] = useState<boolean>(false);
  const [isLoding, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUserFolders(id)
      .then((res) => {
        if (res.val() != null) {
          dispatch(setFolders(Object.entries(res.val())));
        }
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [dispatch, id]);

  const handleModal = () => {
    document.body.classList.add('modal-open');

    setIsNewFolder((prev) => !prev);
  };

  const handleNewFolder = (
    inputName: string,
    id: number | null,
    now: string
  ) => {
    createNewFolder(id, inputName);
    setIsNewFolder(false);
    dispatch(setFolders([...folders, [inputName, [{ createdAt: now }]]]));
  };

  return (
    <div className={styles.folderBlock}>
      {isNewFolder && (
        <ModalInput
          setIsNewOne={setIsNewFolder}
          title="Create a new folder"
          act="new folder"
          handleContent={handleNewFolder}
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

      <div className={styles.container}>
        {isLoding ? (
          <Skeleton />
        ) : (
          <ul>
            {folders.map((item, i) => {
              const [title, { content, description }] = item;

              return (
                <li key={i + 1}>
                  <FolderBlock title={title} description={description} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Folders;
