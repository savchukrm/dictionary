import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../redux/auth/slice';
import { addNewUser } from '../../config/firebase';

import Form from './Form';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      .catch(() => alert('Invalid user'));
  };

  return (
    <div>
      <Form title="register" handleClick={handleRegister} />
    </div>
  );
};

export default SignUp;
