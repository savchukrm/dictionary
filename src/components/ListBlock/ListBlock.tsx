import { Link } from 'react-router-dom';
import styles from './ListBlock.module.css';

interface BlockProps {
  title: string;
}

const ListBlock: React.FC<BlockProps> = ({ title }) => {
  return (
    <Link to={`/lists/${title}`}>
      <div className={styles.card}>
        <h3>{title}</h3>
        <p>count of words</p>
      </div>
    </Link>
  );
};

export default ListBlock;
