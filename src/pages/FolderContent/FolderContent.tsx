import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../redux/store';

import { getUserFolder } from '../../utils/folders/folders';
import { setFolder, clearFolder } from '../../redux/folder/slice';
import { setListForQuiz } from '../../redux/quiz/slice';

import { shuffleArray } from '../../utils/utilityFunctions';

import FolderHeader from '../../components/Headers/FolderHeader/FolderHeader';
import ModalCreate from '../../components/Modals/ModalCreate/ModalCreate';
import EmptyMessage from '../../components/EmptyMessage/EmptyMessage';
import Skeleton from '../../components/Skeleton/Skeleton';
import KitBlock from '../../components/Blocks/KitBlock/KitBlock';

import styles from './FolderContent.module.css';

const FolderContent = () => {
  const dispatch = useAppDispatch();
  const { folderName } = useParams();

  const { id } = useSelector((state: RootState) => state.user);
  const { description, terms } = useSelector(
    (state: RootState) => state.folder
  );

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [isLoding, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await getUserFolder(id, folderName);
        if (res.val() !== undefined) {
          dispatch(setFolder(res.val()));
        } else {
          dispatch(clearFolder());
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFolder();
  }, [id, dispatch, folderName]);

  const handleClearFolder = () => {
    dispatch(clearFolder());
  };

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
    document.body.classList.add('modal-open');
  };

  const handleCreateFlashcardList = () => {
    const newArray = terms.map((item) => [item.definition, item.meaning]);
    const shuffledNewArray = shuffleArray(newArray);
    dispatch(setListForQuiz(shuffledNewArray));
  };

  return (
    <div className={styles.container}>
      {isLoding ? (
        <Skeleton />
      ) : (
        <div>
          <FolderHeader
            terms={terms}
            folderName={folderName}
            description={description}
            handleClearFolder={handleClearFolder}
            handleOpenModalCreate={handleOpenModalCreate}
            handleCreateFlashcardList={handleCreateFlashcardList}
          />

          {terms && terms.length >= 1 ? (
            <KitBlock folderName={folderName} />
          ) : (
            <EmptyMessage handleModal={handleOpenModalCreate} />
          )}

          {openModalCreate && (
            <ModalCreate
              setModal={setOpenModalCreate}
              folderName={folderName}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FolderContent;
