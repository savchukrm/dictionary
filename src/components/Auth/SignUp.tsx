import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import apps from '../../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { ref, get, set } from 'firebase/database';

import { setUser } from '../../redux/auth/slice';
import { addNewUser } from '../../config/firebase';

import Form from './Form';

const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const { database } = apps;
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
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const userRef = ref(database, `users/${user.uid}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            setErrorMessage(
              'You already have an account. Please log in instead'
            );
            return;
          } else {
            dispatch(
              setUser({
                email: user.email,
                id: user.uid,
                token: user.refreshToken,
              })
            );
            set(userRef, {
              email: user.email,
              password: Math.floor(Math.random() * 900000) + 100000,
              array: [],
            });
            navigate('/');
          }
        });
      })
      .catch((error) => {
        console.error(error);
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