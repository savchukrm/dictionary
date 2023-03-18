import { Link } from 'react-router-dom';
import Login from '../components/Auth/Login';

import styles from './Page.module.css';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.block}>
      <h1>Login</h1>
      <Login />
      <p>
        Or <Link to="/register"> register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
