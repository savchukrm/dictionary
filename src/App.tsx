import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './redux/store';

import { getAuth } from 'firebase/auth';
import { setUser } from './redux/auth/slice';

import Header from './components/Header/Header';

import Main from './pages/Main/Main';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFound from './pages/NotFound/NotFound';
import List from './pages/List/List';
import Modal from './pages/Modal/Modal';

import './styles/App.css';

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();

  const { modal } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({ email: user.email, id: user.uid, token: user.refreshToken })
        );
      }
    });
  }, []);

  return (
    <>
      {modal && <Modal />}
      <Header />
      <Routes>
        <Route index={true} path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/list" element={<List />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
