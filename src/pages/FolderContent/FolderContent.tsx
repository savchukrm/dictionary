import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { AiOutlineFolderOpen } from 'react-icons/ai';

import { RootState, useAppDispatch } from '../../redux/store';

import { getUserFolder } from '../../utils/folders/folders';
import { setFolder, clearFolder } from '../../redux/folder/slice';

import styles from './FolderContent.module.css';

const FolderContent = () => {
  const dispatch = useAppDispatch();
  const { folderName } = useParams();

  const { folder } = useSelector((state: RootState) => state.folder);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await getUserFolder(id, folderName);
        if (res.val() !== undefined) {
          const userFolderArray = Object.entries(res.val());

          dispatch(setFolder(userFolderArray));
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

            <p>description</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h1>This folder has no sets yet</h1>
        <p>Organise your study sets with folders.</p>

        <button className="btnAdd">Add set</button>
      </div>
    </div>
  );
};

export default FolderContent;
