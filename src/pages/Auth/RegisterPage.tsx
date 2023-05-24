import { Link } from 'react-router-dom';
import SignUp from '../../components/Auth/SignUp';

import styles from './Page.module.css';

const Register: React.FC = () => {
  return (
    <div className="box">
      <div className={styles.block}>
        <h1>Sign up</h1>
        <SignUp />
        <p>
          Already have an account? <Link to="/login">log in</Link>
        </p>
        <Link to="/">
          <button className={styles.btnReturn}>Return on main page</button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
