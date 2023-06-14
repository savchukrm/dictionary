import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { BsCardText } from 'react-icons/bs';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoChevronBackCircleOutline } from 'react-icons/io5';

import { RootState, useAppDispatch } from '../../redux/store';

import { getUserFavorite } from '../../utils/favorite/favorite';
import { setFavorite } from '../../redux/favorite/slice';
import { setListForQuiz } from '../../redux/quiz/slice';

import { shuffleArray } from '../../utils/utilityFunctions';

import Set from '../../components/Set/Set';

import styles from './ListContent.module.css';

import { DefinitionsItem } from '../../redux/words/types';

const Favourite = () => {
  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery({ maxWidth: 650 });

  const { favorite } = useSelector((state: RootState) => state.favorite);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id !== null) {
      getUserFavorite(id)
        .then((res) => {
          if (res.val() != null) {
            dispatch(setFavorite(Object.entries(res.val())));
          }
        })
        .catch((error) => console.log(error));
    }
  }, [dispatch, id]);

  const handleCreateFlashcardList = () => {
    const newArray = favorite.map((item) => [item[0], item[1][2]]);
    const shuffledNewArray = shuffleArray(newArray);
    dispatch(setListForQuiz(shuffledNewArray));
  };

  const showFlashcardsBtn = favorite.find((el) => el[0] === 'createdAt')
    ? 'hide'
    : '';

  return (
    <div className="box">
      <div className={styles.content}>
        <div className="header">
          <Link to="/lists">
            {isDesktop ? (
              <div className="icon">
                <IoChevronBackCircleOutline />
              </div>
            ) : (
              <button className="btnBack">
                <IoMdArrowRoundBack />
                return
              </button>
            )}
          </Link>

          <h1>Favourites</h1>

          <div onClick={handleCreateFlashcardList}>
            <Link to="/flashcard">
              {isDesktop ? (
                <div className={`icon ${showFlashcardsBtn && 'hide'}`}>
                  <BsCardText />
                </div>
              ) : (
                <button
                  onClick={handleCreateFlashcardList}
                  className={`btnAdd btnFlashcard ${
                    showFlashcardsBtn && 'hide'
                  }`}
                >
                  Flashcards
                </button>
              )}
            </Link>
          </div>
        </div>

        <ul className={styles.contentBlock}>
          {favorite.map((item, i) => {
            const [word, content]: [
              string,
              [DefinitionsItem[], { all: string }, string]
            ] = item;

            const [meanings, pronunciation, mainDefinition] = content;

            return (
              <li key={i}>
                {word === 'createdAt' ? (
                  <p>You do not have any saved items in the current list</p>
                ) : (
                  <Set
                    listName="favorite"
                    word={word}
                    definition={mainDefinition}
                    meanings={meanings}
                    pronunciation={pronunciation}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Favourite;
