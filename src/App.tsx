import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from './redux/store';

import { getAuth } from 'firebase/auth';
import { setUser } from './redux/auth/slice';

import Header from './components/Header/Header';

import Main from './pages/Main/Main';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Lists from './pages/Lists/Lists';
import ListContent from './pages/ListContent/ListContent';
import Modal from './pages/Modal/Modal';
import NotFound from './pages/NotFound/NotFound';
import Favourite from './pages/ListContent/Favourite';

import './styles/App.css';
import Flashcard from './pages/Flashcard/Flashcard';

function App() {
  const dispatch = useAppDispatch();
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
        <Route path="/lists" element={<Lists />} />
        <Route path="/flashcard" element={<Flashcard />} />
        <Route path="/lists/:listName" element={<ListContent />} />
        <Route path="/lists/favourites" element={<Favourite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
