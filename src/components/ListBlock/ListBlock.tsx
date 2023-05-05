import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

import Menu from './Menu/Menu';
import ModalDelete from './Menu/ModalDelete/ModalDelete';
import ModalChange from './Menu/ModalChange/ModalChange';

import styles from './ListBlock.module.css';

export interface BlockProps {
  title: string;
  length: number;
}

const ListBlock: React.FC<BlockProps> = ({ title, length }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalChange, setModalChange] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenModal((prev) => !prev);
  };

  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setOpenModal(false);
    }
  };

  return (
    <div>
      {modalDelete && (
        <ModalDelete setModalDelete={setModalDelete} title={title} />
      )}

      {modalChange && (
        <ModalChange setModalChange={setModalChange} title={title} />
      )}

      <div className={styles.block}>
        <div className={styles.card}>
          <Link to={`/lists/${title}`}>
            <h3>{title}</h3>
          </Link>
          <div className={styles.bottom}>
            <p>{length === 1 ? `${length} word` : `${length} words`}</p>

            {!openModal ? (
              <button onClick={handleOpen} className={styles.btn}>
                <BsThreeDotsVertical />
              </button>
            ) : (
              <button onClick={handleClose} className={styles.btn}>
                <IoMdClose />
              </button>
            )}
          </div>
        </div>

        {openModal && (
          <div ref={popupRef}>
            <Menu
              setModalDelete={setModalDelete}
              setOpenModal={setOpenModal}
              setModalChange={setModalChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListBlock;
