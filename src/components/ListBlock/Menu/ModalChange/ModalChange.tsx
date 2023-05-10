import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { RootState, useAppDispatch } from '../../../../redux/store';

import { setLists } from '../../../../redux/lists/slice';
import { changeListName } from '../../../../utils/firebase';

import styles from '../../../ModalInput/ModalInput.module.css';

interface ModalChangeProps {
  setModalChange: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const ModalChange: React.FC<ModalChangeProps> = ({ setModalChange, title }) => {
  const dispatch = useAppDispatch();

  const [newName, setNewName] = useState('');

  const { id } = useSelector((state: RootState) => state.user);
  const { lists } = useSelector((state: RootState) => state.lists);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeListName(id, title, newName);
    setModalChange(false);

    const updatedLists = lists.map((list: any) => {
      const [name, content] = list;
      if (name === title) {
        return [newName, { ...content }];
      } else {
        return list;
      }
    });

    dispatch(setLists(updatedLists));

    document.body.classList.remove('modal-open');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleModal = () => {
    setModalChange(false);

    document.body.classList.remove('modal-open');
  };

  return (
    <div className={styles.modal}>
      <div className={styles.block}>
        <div className={styles.top}>
          <h3 className={styles.h3}>Edit list name</h3>
          <button onClick={handleModal} className={styles.smallBtn}>
            <CgClose />
          </button>
        </div>
        <form className={styles.main} onSubmit={handleSubmit}>
          <label>
            New list name
            <input
              className={styles.formInput}
              type="text"
              placeholder="new name"
              onChange={handleChange}
            />
          </label>
          <input
            disabled={newName.length < 1}
            className={styles.btnConfirm}
            type="submit"
            value="Change name"
          />
        </form>
      </div>
    </div>
  );
};

export default ModalChange;
