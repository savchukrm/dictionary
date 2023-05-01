import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';

import { RootState } from '../../redux/store';

import Set from '../../components/Set/Set';

import styles from './ListContent.module.css';

const ListContent = () => {
  const { listName } = useParams();
  const { lists } = useSelector((state: RootState) => state.lists);

  const list: any = lists.find((el) => el[0] === listName);
  const [name, info] = list;
  const wordsInList = Object.entries(info);

  return (
    <div className={styles.content}>
      <div className={styles.top}>
        <Link to="/lists">
          <button className="btnBack">
            <IoMdArrowRoundBack />
            All lists
          </button>
        </Link>
        <h1>{name}</h1>
      </div>

      <ul className={styles.contentBlock}>
        {wordsInList.map((item, i) => {
          const [listName, content]: [string, any] = item;
          const definition = content[0].definition;

          return (
            <li key={i}>
              {listName === 'createdAt' ? (
                <p>You do not have any saved items in the current list</p>
              ) : (
                <Set listName={listName} definition={definition} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListContent;
