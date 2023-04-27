import styles from './ListBlock.module.css';

interface BlockProps {
  title: string;
}

const ListBlock: React.FC<BlockProps> = ({ title }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>count of words</p>
    </div>
  );
};

export default ListBlock;
