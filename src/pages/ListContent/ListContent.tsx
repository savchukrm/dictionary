import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';

import { RootState, useAppDispatch } from '../../redux/store';

import { getUserList } from '../../utils/firebase';
import { setList, clearList } from '../../redux/set/slice';
import { setListForQuiz } from '../../redux/quiz/slice';

import { shuffleArray } from '../../utils/utilityFunctions';

import Set from '../../components/Set/Set';

import styles from './ListContent.module.css';

import { DefinitionsItem } from '../../redux/words/types';

const ListContent = () => {
  const dispatch = useAppDispatch();
  const { listName } = useParams();

  const { list } = useSelector((state: RootState) => state.list);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchLists = async () => {
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
    fetchLists();
  }, [id, dispatch]);

  const handleClearLlist = () => {
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
    <div className={styles.content}>
      <div className="header">
        <Link to="/lists">
          <button onClick={handleClearLlist} className="btnBack">
            <IoMdArrowRoundBack />
            All lists
          </button>
        </Link>

        <h1>{listName}</h1>

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
  );
};

export default ListContent;
