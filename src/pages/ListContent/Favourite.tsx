import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IoMdArrowRoundBack } from 'react-icons/io';

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

  const { favorite } = useSelector((state: RootState) => state.favorite);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getUserFavorite(id)
      .then((res) => {
        if (res.val() != null) {
          dispatch(setFavorite(Object.entries(res.val())));
        }
      })
      .catch((error) => console.log(error));
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
            <button className="btnBack">
              <IoMdArrowRoundBack />
              return
            </button>
          </Link>

          <h1>Favourites</h1>

          <Link to="/flashcard">
            <button
              onClick={handleCreateFlashcardList}
              className={`btnAdd btnFlashcard ${showFlashcardsBtn && 'hide'}`}
            >
              Flashcards
            </button>
          </Link>
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
