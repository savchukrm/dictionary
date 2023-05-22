import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../../../redux/store';

import { deleteTermFromFolder } from '../../../../utils/folders/folders';
import { setFolder } from '../../../../redux/folder/slice';

import ModalChangeKit from '../../../Modals/ModalChangeKit/ModalChangeKit';

import styles from '../../KitBlock.module.css';

interface KitMenuProps {
  index: number;
  folderName: string | undefined;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const KitMenu: React.FC<KitMenuProps> = ({
  index,
  folderName,
  setOpenMenu,
}) => {
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [currentTerm, setCurrentTerm] = useState('');

  const { id } = useSelector((state: RootState) => state.user);
  const folder = useSelector((state: RootState) => state.folder);

  const handleOpenModalForDefinition = () => {
    setCurrentTerm('definition');
    setOpenModal(true);

    document.body.classList.add('modal-open');
  };

  const handleOpenModalForMeaning = () => {
    setCurrentTerm('meaning');
    setOpenModal(true);

    document.body.classList.add('modal-open');
  };

  const handleCloseModal = () => {
    setOpenModal(false);

    document.body.classList.remove('modal-open');
  };

  const deleteSet = () => {
    if (index >= 0 && index < folder.terms.length) {
      const updatedTerms = [...folder.terms];
      updatedTerms.splice(index, 1);

      const updatedFolder = {
        ...folder,
        terms: updatedTerms,
      };

      dispatch(setFolder(updatedFolder));
    }
    deleteTermFromFolder(id, folderName, index);
  };

  return (
    <div>
      <ul className={styles.menu}>
        <div onClick={handleOpenModalForDefinition} className={styles.point}>
          Edit term
        </div>
        <div onClick={handleOpenModalForMeaning} className={styles.point}>
          Edit meaning
        </div>
        <div onClick={deleteSet} className={styles.point}>
          Delete set
        </div>
      </ul>

      {openModal && (
        <ModalChangeKit
          index={index}
          name={currentTerm}
          folderName={folderName}
          closeModal={handleCloseModal}
          setOpenMenu={setOpenMenu}
        />
      )}
    </div>
  );
};

export default KitMenu;
