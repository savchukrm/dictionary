import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../redux/auth/slice';

import Form from './Form';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email, password) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({ email: user.email, id: user.id, token: user.accessToken })
        );
        navigate('/');
      })
      .catch(console.err);
  };
  return (
    <div>
      <Form title="register" handleClick={handleRegister} />
    </div>
  );
};

export default SignUp;
