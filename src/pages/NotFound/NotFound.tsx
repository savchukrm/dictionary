import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  const { mode } = useSelector((state: RootState) => state.mode);

  return (
    <div className={styles.notFound}>
      <h2>Nothing found</h2>
      <p>Unfortunately this page is missing...</p>
      <img
        width={350}
        height={350}
        src={mode === 'dark' ? '/img/404light.png' : '/img/404dark.png'}
        alt="not-found"
      />
      <Link to="/">
        <div className={styles.btn}>Return back</div>
      </Link>
    </div>
  );
};

export default NotFound;
