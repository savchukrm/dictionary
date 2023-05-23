import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { RootState, useAppDispatch } from '../../../redux/store';

import { updateMainDefinitionOnList } from '../../../utils/lists/list';
import { updateMainDefinitionOnFavorite } from '../../../utils/favorite/favorite';

import { setList } from '../../../redux/list/slice';
import { setFavorite } from '../../../redux/favorite/slice';

import styles from '../ModalChangeKit/ModalChangeKit.module.css';

interface ModalChangeKitProps {
  word: string;
  listName: string | undefined;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalChangeWord: React.FC<ModalChangeKitProps> = ({
  word,
  setModal,
  listName,
}) => {
  const dispatch = useAppDispatch();

  const [term, setTerm] = useState('');

  const { id } = useSelector((state: RootState) => state.user);
  const { list } = useSelector((state: RootState) => state.list);
  const { favorite } = useSelector((state: RootState) => state.favorite);

  const updateCurrentList = () => {
    updateMainDefinitionOnList(id, listName, word, term);

    const updatedDefinition = list.map((el) => {
      const [def, content] = el;
      if (def === word) {
        return [def, [content[0], content[1], term]];
      } else {
        return el;
      }
    });

    dispatch(setList(updatedDefinition));
  };

  const updateFavoriteList = () => {
    updateMainDefinitionOnFavorite(id, word, term);

    const updatedDefinition = favorite.map((el) => {
      const [def, content] = el;
      if (def === word) {
        return [def, [content[0], content[1], term]];
      } else {
        return el;
      }
    });

    dispatch(setFavorite(updatedDefinition));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (term !== '') {
      listName === 'favorite' ? updateFavoriteList() : updateCurrentList();
    }

    setTerm('');
    setModal(false);

    document.body.classList.remove('modal-open');
  };

  const handleChangeTerm = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTerm(event.target.value);
  };

  const handleClose = () => {
    setModal(false);

    document.body.classList.remove('modal-open');
  };

  return (
    <div className="modal">
      <div className={styles.block}>
        <div className={styles.top}>
          <h3 className={styles.h3}>Write own definition</h3>
          <button className={styles.smallBtn} onClick={handleClose}>
            <CgClose />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            <textarea
              placeholder={`Enter new definition`}
              value={term}
              onChange={handleChangeTerm}
              className={styles.input}
            ></textarea>
          </label>

          <input
            disabled={term.length < 1}
            type="submit"
            value={`Change`}
            className={styles.btnConfirm}
          />
        </form>
      </div>
    </div>
  );
};

export default ModalChangeWord;
