import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { setUser } from '../../redux/auth/slice';
import { addNewUser } from '../../config/firebase';

import Form from './Form';

const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleRegister = (email: string, password: string) => {
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

  const signUpViaGoogle = () => {
    signInWithPopup(auth, provider).then(({ user }) => {
      dispatch(
        setUser({ email: user.email, id: user.uid, token: user.refreshToken })
      );

      addNewUser(
        user.uid,
        user.email,
        Math.floor(Math.random() * 900000) + 100000,
        []
      );

      navigate('/');
    });
  };

  return (
    <div>
      <Form
        title="register"
        handleClick={handleRegister}
        viaGoogle={signUpViaGoogle}
        error={errorMessage}
      />
    </div>
  );
};

export default SignUp;
