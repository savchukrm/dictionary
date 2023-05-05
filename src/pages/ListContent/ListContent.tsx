import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';

import { RootState, useAppDispatch } from '../../redux/store';

import { getUserList } from '../../utils/firebase';
import { setList, clearList } from '../../redux/set/slice';

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

  return (
    <div className={styles.content}>
      <div className={styles.top}>
        <Link to="/lists">
          <button onClick={handleClearLlist} className="btnBack">
            <IoMdArrowRoundBack />
            All lists
          </button>
        </Link>
        <h1>{listName}</h1>
      </div>

      <ul className={styles.contentBlock}>
        {list.map((item, i) => {
          const [word, content]: [
            string,
            [DefinitionsItem[], { all: string }]
          ] = item;

          const [meanings, pronunciation] = content;

          const definition = meanings[0].definition;

          return (
            <li key={i}>
              {listName === 'createdAt' ? (
                <p>You do not have any saved items in the current list</p>
              ) : (
                <Set
                  listName={listName}
                  word={word}
                  definition={definition}
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
