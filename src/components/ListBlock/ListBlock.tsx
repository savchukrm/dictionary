import { Link } from 'react-router-dom';

import styles from './ListBlock.module.css';

interface BlockProps {
  title: string;
  length: number;
}

const ListBlock: React.FC<BlockProps> = ({ title, length }) => {
  return (
    <Link to={`/lists/${title}`}>
      <div className={styles.card}>
        <h3>{title}</h3>
        <p>{length === 1 ? `${length} word` : `${length} words`}</p>
      </div>
    </Link>
  );
};

export default ListBlock;
