import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../redux/auth/slice';

import Form from './Form';

const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          setUser({ email: user.email, id: user.uid, token: user.refreshToken })
        );
        navigate('/');
      })
      .catch((error) => {
        let errorCode = error.code;

        switch (errorCode) {
          case 'auth/user-not-found':
            setErrorMessage('User not found');
            break;
          case 'auth/wrong-password':
            setErrorMessage('Wrong password');
            break;
          case 'auth/too-many-requests':
            setErrorMessage('Too many requests. Please try again in 1 minute');
            break;
          default:
            break;
        }
      });
  };

  return (
    <div>
      <Form title="log in" handleClick={handleLogin} error={errorMessage} />
    </div>
  );
};

export default Login;
