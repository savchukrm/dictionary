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
}

const KitMenu: React.FC<KitMenuProps> = ({ index, folderName }) => {
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [currentTerm, setCurrentTerm] = useState('');

  const { id } = useSelector((state: RootState) => state.user);
  const folder = useSelector((state: RootState) => state.folder);

  const handleOpenModalForDefinition = () => {
    setCurrentTerm('definition');
    setOpenModal(true);
  };

  const handleOpenModalForMeaning = () => {
    setCurrentTerm('meaning');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const deleteSet = () => {
    if (index >= 0 && index < folder.terms.length) {
      const updatedTerms = [...folder.terms];
      updatedTerms.splice(index, 1); // Remove the term at the specified index

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
        />
      )}
    </div>
  );
};

export default KitMenu;
