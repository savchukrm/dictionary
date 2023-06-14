import styles from './FlashcardBlock.module.css';

interface FlashcardProps {
  word: string;
  definition: string;
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlashcardBlock: React.FC<FlashcardProps> = ({
  word,
  definition,
  isFlipped,
  setIsFlipped,
}) => {
  function handleClick() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div className={styles.flashcard} onClick={handleClick}>
      <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className={styles.flashcardFront}>
          <h3>{word}</h3>
        </div>

        <div className={styles.flashcardBack}>
          <h4>Definition</h4>
          <p className={styles.definition}>{definition}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashcardBlock;
