import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AiOutlineFolderOpen } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

import { RootState, useAppDispatch } from '../../redux/store';
import { setFolders } from '../../redux/folders/slice';

import {
  changeFolderName,
  removeFolderFromFolders,
} from '../../utils/folders/folders';

import FolderMenu from './Menu/FolderMenu';
import ModalDescription from '../Modals/ModalDescription/ModalDescription';
import ModalChange from '../Modals/ModalChange/ModalChange';
import ModalDelete from '../Modals/ModalDelete/ModalDelete';
import SettingBtn from '../SettingBtn/SettingBtn';

import styles from './FolderBlock.module.css';

interface FolderBlockProps {
  title: string;
  description: string;
}

const FolderBlock: React.FC<FolderBlockProps> = ({ title, description }) => {
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [modalChange, setModalChange] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const { folders } = useSelector((state: RootState) => state.folders);

  const popupRef = useRef<HTMLDivElement>(null);

  const handleModal = () => {
    setOpenModal(true);
  };

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenMenu((prev) => !prev);
  };

  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setOpenMenu(false);
    }
  };

  const handleChangeFolderName = (
    id: number | null,
    newName: string,
    title: string
  ) => {
    changeFolderName(id, title, newName);

    const updatedFolders = folders.map((list: any) => {
      const [name, content] = list;
      if (name === title) {
        return [newName, { ...content }];
      } else {
        return list;
      }
    });
    dispatch(setFolders(updatedFolders));
  };

  const handleDeleteFolder = (id: number | null, title: string) => {
    const newFolders = folders.filter((item) => item[0] !== title);
    dispatch(setFolders(newFolders));
    removeFolderFromFolders(id, title);
  };

  return (
    <>
      {openModal && (
        <ModalDescription title={title} setModalDescription={setOpenModal} />
      )}

      {modalChange && (
        <ModalChange
          handleContent={handleChangeFolderName}
          setModalChange={setModalChange}
          title={title}
          name="folder"
        />
      )}

      {modalDelete && (
        <ModalDelete
          title={title}
          name="folder"
          setModalDelete={setModalDelete}
          handleDeleteOne={handleDeleteFolder}
        />
      )}

      <div className={styles.block}>
        <Link to={`/folders/${title}`}>
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.folder}>
                <AiOutlineFolderOpen />
              </div>
              <h4>{title}</h4>
            </div>

            <SettingBtn
              openMenu={openMenu}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          </div>
        </Link>

        <div className={styles.footer}>
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : (
            <div className={styles.bottom}>
              <button onClick={handleModal} className={styles.plus}>
                <AiOutlinePlus />
              </button>
              <span>add description</span>
            </div>
          )}
        </div>
      </div>

      {openMenu && (
        <div className={styles.menuBlock} ref={popupRef}>
          <FolderMenu
            setOpenMenu={setOpenMenu}
            setModalChange={setModalChange}
            setModalDelete={setModalDelete}
            setModalDescription={setOpenModal}
          />
        </div>
      )}
    </>
  );
};

export default FolderBlock;
