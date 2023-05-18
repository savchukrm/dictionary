import styles from '../KitBlock.module.css';

interface KitElementProps {
  definition: string;
  meaning: string;
}

const KitElement: React.FC<KitElementProps> = ({ definition, meaning }) => {
  return (
    <div className={styles.block}>
      <div className={`${styles.item} ${styles.term}`}>
        <p>{definition}</p>
      </div>
      <div className={`${styles.item} ${styles.definition}`}>
        <p>{meaning}</p>
      </div>
    </div>
  );
};

export default KitElement;
