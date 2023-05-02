import { Link } from 'react-router-dom';

import { BlockProps } from './ListBlock';

import styles from './ListBlock.module.css';

const FavoriteBlock: React.FC<BlockProps> = ({ title, length }) => {
  return (
    <Link to={`/lists/${title}`}>
      <div className={styles.card}>
        <h3>{title}</h3>
        <p>{length === 1 ? `${length} word` : `${length} words`}</p>
      </div>
    </Link>
  );
};

export default FavoriteBlock;
