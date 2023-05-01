import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IoMdArrowRoundBack } from 'react-icons/io';

import { RootState } from '../../redux/store';

import Set from '../../components/Set/Set';

import styles from './ListContent.module.css';

const Favourite = () => {
  const { favorite } = useSelector((state: RootState) => state.favorite);

  return (
    <div className={styles.content}>
      <div className={styles.top}>
        <Link to="/lists">
          <button className="btnBack">
            <IoMdArrowRoundBack />
            All lists
          </button>
        </Link>
        <h1>Favourites</h1>
      </div>

      <ul className={styles.contentBlock}>
        {favorite.map((item, i) => {
          const [word, content]: [string, any] = item;

          const definition = content[0].definition;

          return (
            <li key={i}>
              {favorite[0] === 'createdAt' ? (
                <p>You do not have any saved items in the current list</p>
              ) : (
                <Set listName={word} definition={definition} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Favourite;
