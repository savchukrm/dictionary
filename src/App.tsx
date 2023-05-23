import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from './redux/store';

import { getAuth } from 'firebase/auth';
import { setUser } from './redux/auth/slice';

import Header from './components/Headers/Header/Header';

import Main from './pages/Main/Main';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Lists from './pages/Lists/Lists';
import ListContent from './pages/ListContent/ListContent';
import Favourite from './pages/ListContent/Favourite';
import Folders from './pages/Folders/Folders';
import FolderContent from './pages/FolderContent/FolderContent';
import Modal from './pages/Modal/Modal';
import Flashcard from './pages/Flashcard/Flashcard';
import NotFound from './pages/NotFound/NotFound';

import './styles/App.css';

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
        <Route path="/lists/:listName" element={<ListContent />} />
        <Route path="/lists/favourites" element={<Favourite />} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/folders/:folderName" element={<FolderContent />} />
        <Route path="/flashcard" element={<Flashcard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
