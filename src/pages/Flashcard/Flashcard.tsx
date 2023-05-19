import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../redux/store';

import FlashcardBlock from '../../components/Flashcard/FlashcardBlock';

import styles from './Flashcard.module.css';

const Flashcard = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const [sureCount, setSureCount] = useState(0);
  const [notSureCount, setNotSureCount] = useState(0);

  const [isFlipped, setIsFlipped] = useState(false);

  const { quizList } = useSelector((state: RootState) => state.quiz);

  const handleResponse = () => {
    setProgress((prevProgress) => prevProgress + 100 / quizList.length);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleCountSureResponses = () => {
    handleResponse();
    setSureCount((prev) => prev + 1);
    setIsFlipped(false);
  };

  const handleCountNotSureResponses = () => {
    handleResponse();
    setNotSureCount((prev) => prev + 1);
    setIsFlipped(false);
  };

  return (
    <div className={styles.container}>
      <h1>Flashcards Study Session</h1>

      {quizList.length ? (
        <div className={styles.main}>
          {currentIndex < quizList.length && (
            <div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${progress}%`, transition: 'width 2s' }}
                ></div>
              </div>

              <FlashcardBlock
                word={quizList[currentIndex][0]}
                definition={quizList[currentIndex][1]}
                isFlipped={isFlipped}
                setIsFlipped={setIsFlipped}
              />

              <p className={styles.prompt}>Tap card to reveal answer</p>

              <div className={styles.btnBlock}>
                <button
                  onClick={handleCountNotSureResponses}
                  className={styles.notSureBtn}
                >
                  not sure
                </button>
                <button
                  onClick={handleCountSureResponses}
                  className={styles.sureBtn}
                >
                  got it!
                </button>
              </div>
            </div>
          )}

          {currentIndex === quizList.length && (
            <div>
              <h3>You have completed the flashcards study session!</h3>

              <div className={styles.blocks}>
                <div className={styles.blockNotSure}>
                  <span>{notSureCount}</span>
                  <span> not sure </span>
                </div>

                <div className={styles.blockSure}>
                  <span>{sureCount}</span>
                  <span> got it! </span>
                </div>
              </div>

              <Link to="/folders">
                <button className={styles.btnGo}> Go to folders</button>
              </Link>

              <Link to="/lists">
                <button className={styles.btnGo}> Go to lists </button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className={styles.advice}>
            Go to page with the lists and choose list you want to learn
          </h2>

          <Link to="/lists">
            <button className={styles.btnGo}> Go to lists </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
