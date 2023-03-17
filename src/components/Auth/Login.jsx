import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import Form from './Form';

import { setUser } from '../../redux/auth/slice';

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(console.log)
      .catch(console.err);
  };

  return (
    <div>
      <Form title="log in" handleClick={handleLogin} />
    </div>
  );
};

export default Login;
