import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { BsCardText } from 'react-icons/bs';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoChevronBackCircleOutline } from 'react-icons/io5';

import { RootState, useAppDispatch } from '../../redux/store';

import { getUserList } from '../../utils/lists/list';
import { setList, clearList } from '../../redux/list/slice';
import { setListForQuiz } from '../../redux/quiz/slice';

import { shuffleArray } from '../../utils/utilityFunctions';

import Set from '../../components/Set/Set';

import styles from './ListContent.module.css';

import { DefinitionsItem } from '../../redux/words/types';

const ListContent = () => {
  const dispatch = useAppDispatch();
  const { listName } = useParams();

  const isDesktop = useMediaQuery({ maxWidth: 650 });

  const { list } = useSelector((state: RootState) => state.list);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id !== null) {
      const fetchList = async () => {
        try {
          const res = await getUserList(id, listName);
          if (res.val() !== undefined) {
            const userListsArray = Object.entries(res.val());
            dispatch(setList(userListsArray));
          } else {
            dispatch(clearList());
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchList();
    }
  }, [id, dispatch]);

  const handleClearList = () => {
    dispatch(clearList());
  };

  const handleCreateFlashcardList = () => {
    const newArray = list.map((item) => [item[0], item[1][2]]);
    const shuffledNewArray = shuffleArray(newArray);
    dispatch(setListForQuiz(shuffledNewArray));
  };

  const showFlashcardsBtn = list.find((el) => el[0] === 'createdAt')
    ? 'hide'
    : '';

  return (
    <div className="box">
      <div className={styles.content}>
        <div className="header">
          <Link to="/lists">
            {isDesktop ? (
              <div className="icon" onClick={handleClearList}>
                <IoChevronBackCircleOutline />
              </div>
            ) : (
              <button className="btnBack" onClick={handleClearList}>
                <IoMdArrowRoundBack />
                return
              </button>
            )}
          </Link>

          <h1>{listName}</h1>

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
          {list.map((item, i) => {
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
                    listName={listName}
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

export default ListContent;
