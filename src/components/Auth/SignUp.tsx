import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { setUser } from '../../redux/auth/slice';
import { addNewUser } from '../../config/firebase';

import Form from './Form';

const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({ email: user.email, id: user.uid, token: user.refreshToken })
        );
        addNewUser(user.uid, email, password, []);

        navigate('/');
      })
      .catch((error) => {
        let errorCode = error.code;

        switch (errorCode) {
          case 'auth/email-already-in-use':
            setErrorMessage('Email already in use');
            break;
          case 'auth/weak-password':
            setErrorMessage('The password is too weak.');
            break;
          case 'auth/too-many-requests':
            setErrorMessage('Too many requests. Please try again in 1 minute');
            break;
          case 'auth/network-request-failed':
            setErrorMessage('Network request failed');
            break;
          default:
            break;
        }
      });
  };

  return (
    <div>
      <Form
        title="register"
        handleClick={handleRegister}
        error={errorMessage}
      />
    </div>
  );
};

export default SignUp;
