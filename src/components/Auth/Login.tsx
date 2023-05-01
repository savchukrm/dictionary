import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  UserCredential,
} from 'firebase/auth';

import { setUser } from '../../redux/auth/slice';

import Form from './Form';

const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (email: string, password: string) => {
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

  function loginViaGoogle() {
    signInWithPopup(auth, provider)
      .then((credential: UserCredential) => {
        const user = credential.user;
        const additionalUserInfo = getAdditionalUserInfo(credential);

        if (additionalUserInfo && additionalUserInfo.isNewUser) {
          setErrorMessage(
            'User not found. Please go to the registration page and create an account'
          );
          const user = auth.currentUser;

          if (user) {
            user
              .delete()
              .then(() => {})
              .catch((error) => {
                console.error(error);
              });
          }
        } else {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.refreshToken,
            })
          );
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <Form
        title="log in"
        handleClick={handleLogin}
        error={errorMessage}
        viaGoogle={loginViaGoogle}
      />
    </div>
  );
};

export default Login;