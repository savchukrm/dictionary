import { Link } from 'react-router-dom';
import SignUp from '../../components/Auth/SignUp';

import styles from './Page.module.css';

const Register: React.FC = () => {
  return (
    <div className={styles.block}>
      <h1>Sign up</h1>
      <SignUp />
      <p>
        Already have an account? <Link to="/login">log in</Link>
      </p>
    </div>
  );
};

export default Register;
