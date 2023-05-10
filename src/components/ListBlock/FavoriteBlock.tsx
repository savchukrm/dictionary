import { Link } from 'react-router-dom';

import { BlockProps } from './ListBlock';

import styles from './ListBlock.module.css';

const FavoriteBlock: React.FC<BlockProps> = ({ title, length }) => {
  return (
    <div className={styles.card}>
      <Link to={`/lists/${title}`}>
        <h3>{title}</h3>
      </Link>
      <p>{length === 1 ? `${length} word` : `${length} words`}</p>
    </div>
  );
};

export default FavoriteBlock;
