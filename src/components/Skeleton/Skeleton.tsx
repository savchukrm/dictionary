import styles from './Skeleton.module.css';

function Skeleton() {
  return (
    <div className={styles.threeDotsSkeleton}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
}

export default Skeleton;
