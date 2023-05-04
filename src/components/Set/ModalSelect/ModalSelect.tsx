import { CgClose } from 'react-icons/cg';

import styles from './ModalSelect.module.css';

interface ModalSelectProps {
  setModalSelect: React.Dispatch<React.SetStateAction<boolean>>;
  word: string;
  content: any;
}

const ModalSelect: React.FC<ModalSelectProps> = ({
  setModalSelect,
  word,
  content,
}) => {
  const handleCloseModal = () => {
    setModalSelect(false);
  };

  return (
    <div className="modal">
      <div className={styles.block}>
        <h1>Select a New Definition</h1>
        <h3>{word}</h3>
        <button onClick={handleCloseModal} className={styles.smallBtn}>
          <CgClose />
        </button>
        <ul className={styles.contentBlock}>
          {content.map((item: { definition: any }) => {
            return <li>{item.definition}</li>;
          })}
        </ul>
        <button>Update Definition</button>
      </div>
    </div>
  );
};

export default ModalSelect;
