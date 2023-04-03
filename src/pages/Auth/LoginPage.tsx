import { Link } from 'react-router-dom';
import Login from '../../components/Auth/Login';

import styles from './Page.module.css';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.block}>
      <h1>Log in</h1>
      <Login />
      <p>
        Or <Link to="/register"> register</Link>
      </p>
      <Link to="/">
        <button className={styles.btnReturn}>Return on main page</button>
      </Link>
    </div>
  );
};

export default LoginPage;
