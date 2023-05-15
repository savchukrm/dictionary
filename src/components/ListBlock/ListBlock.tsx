import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

import { RootState, useAppDispatch } from '../../redux/store';
import { setLists } from '../../redux/lists/slice';

import { changeListName, removeListFromLists } from '../../utils/lists/list';

import Menu from './Menu/Menu';
import ModalDelete from '../Modals/ModalDelete/ModalDelete';
import ModalChange from '../Modals/ModalChange/ModalChange';

import styles from './ListBlock.module.css';

export interface BlockProps {
  title: string;
  length: number;
}

const ListBlock: React.FC<BlockProps> = ({ title, length }) => {
  const dispatch = useAppDispatch();

  const [openMenu, setOpenMenu] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalChange, setModalChange] = useState(false);

  const { lists } = useSelector((state: RootState) => state.lists);

  const popupRef = useRef<HTMLDivElement>(null);

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

  const handleChangeListName = (
    id: number | null,
    newName: string,
    title: string
  ) => {
    changeListName(id, title, newName);

    const updatedLists = lists.map((list: any) => {
      const [name, content] = list;
      if (name === title) {
        return [newName, { ...content }];
      } else {
        return list;
      }
    });

    dispatch(setLists(updatedLists));
  };

  const handleDeleteList = (id: number | null, title: string) => {
    const newList = lists.filter((item) => item[0] !== title);
    dispatch(setLists(newList));
    removeListFromLists(id, title);
  };

  return (
    <div>
      {modalDelete && (
        <ModalDelete
          title={title}
          name="list"
          setModalDelete={setModalDelete}
          handleDeleteOne={handleDeleteList}
        />
      )}

      {modalChange && (
        <ModalChange
          title={title}
          name="list"
          handleContent={handleChangeListName}
          setModalChange={setModalChange}
        />
      )}

      <div className={styles.block}>
        <div className={styles.card}>
          <Link to={`/lists/${title}`}>
            <h3>{title}</h3>
          </Link>

          <div className={styles.bottom}>
            <p>{length === 1 ? `${length} word` : `${length} words`}</p>

            {!openMenu ? (
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

        {openMenu && (
          <div ref={popupRef}>
            <Menu
              setModalDelete={setModalDelete}
              setOpenMenu={setOpenMenu}
              setModalChange={setModalChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListBlock;
