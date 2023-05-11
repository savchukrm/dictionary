import { useState } from 'react';

import { AiOutlineFolderOpen } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

import ModalAdd from './ModalAdd/ModalAdd';

import styles from './FolderBlock.module.css';

interface FolderBlockProps {
  title: string;
  description: string;
}

const FolderBlock: React.FC<FolderBlockProps> = ({ title, description }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      {openModal && <ModalAdd title={title} visibleModal={setOpenModal} />}
      <div className={styles.block}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.folder}>
              <AiOutlineFolderOpen />
            </div>
            <h4>{title}</h4>
          </div>
          <div>
            <div>
              <BsThreeDotsVertical />
            </div>
          </div>
        </div>

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
    </>
  );
};

export default FolderBlock;
