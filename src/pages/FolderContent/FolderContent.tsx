import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { AiOutlineFolderOpen } from 'react-icons/ai';

import { RootState, useAppDispatch } from '../../redux/store';

import { getUserFolder } from '../../utils/folders/folders';
import { setFolder, clearFolder } from '../../redux/folder/slice';

import styles from './FolderContent.module.css';
import ModalCreate from '../../components/Modals/ModalCreate/ModalCreate';

const FolderContent = () => {
  const dispatch = useAppDispatch();
  const { folderName } = useParams();

  const { id } = useSelector((state: RootState) => state.user);
  const { description } = useSelector((state: RootState) => state.folder);

  const [openModalCreate, setOpenModalCreate] = useState(false);

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await getUserFolder(id, folderName);
        if (res.val() !== undefined) {
          dispatch(setFolder(res.val()));
        } else {
          dispatch(clearFolder());
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFolder();
  }, [id, dispatch]);

  const handleClearFolder = () => {
    dispatch(clearFolder());
  };

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
    document.body.classList.add('modal-open');
  };

  return (
    <div className={styles.container}>
      <div className="header">
        <div className={styles.head}>
          <Link to="/folders">
            <button onClick={handleClearFolder} className="btnBack">
              <IoMdArrowRoundBack />
              return
            </button>
          </Link>

          <div>
            <div className={styles.title}>
              <AiOutlineFolderOpen />
              <h1>{folderName}</h1>
            </div>

            <p>{description}</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h1>This folder has no sets yet</h1>
        <p>Organise your study sets with folders.</p>

        <button onClick={handleOpenModalCreate} className="btnAdd">
          Add set
        </button>
      </div>

      {openModalCreate && <ModalCreate setModal={setOpenModalCreate} />}
    </div>
  );
};

export default FolderContent;
