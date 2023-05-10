import { CgClose } from 'react-icons/cg';

import styles from './ModalSelect.module.css';

import { DefinitionsItem } from '../../../redux/words/types';
import Sort from './Sort/Sort';

interface ModalSelectProps {
  listName: string | undefined;
  setModalSelect: React.Dispatch<React.SetStateAction<boolean>>;
  word: string;
  content: DefinitionsItem[];
  pronunciation: { all: string };
}

const ModalSelect: React.FC<ModalSelectProps> = ({
  setModalSelect,
  word,
  content,
  pronunciation,
  listName,
}) => {
  const handleCloseModal = () => {
    setModalSelect(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <div className="modal">
      <div className={styles.block}>
        <button onClick={handleCloseModal} className={styles.btnClose}>
          <CgClose />
        </button>
        <h2>Select a New Definition</h2>
        <h3>{word}</h3>
        <span>/{pronunciation.all}/</span>
        <ul className={styles.contentBlock}>
          <Sort
            content={content}
            listName={listName}
            word={word}
            setModalSelect={setModalSelect}
          />
        </ul>
      </div>
    </div>
  );
};

export default ModalSelect;
