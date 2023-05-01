import styles from './Set.module.css';

interface SetProps {
  listName: string;
  definition: string;
}

const Set: React.FC<SetProps> = ({ listName, definition }) => {
  return (
    <div className={styles.setBlock}>
      <h3>{listName}</h3>
      <p>{definition}</p>
    </div>
  );
};

export default Set;
