import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className="box">
      <div className={styles.notFound}>
        <h2>Nothing found</h2>
        <p>Unfortunately this page is missing...</p>
        <img
          width={350}
          height={350}
          src={process.env.REACT_APP_PUBLIC_URL + '/img/404light.png'}
          alt="not-found"
        />
        <Link to="/">
          <div className={styles.btn}>Return back</div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
