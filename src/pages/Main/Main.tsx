import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { getUserList } from '../../config/firebase';
import { setList } from '../../redux/list/slice';

import Search from '../../components/Search/Search';
import Image from '../../components/Image';
import Word from '../../components/Word/Word';

import styles from './Main.module.css';
import ModalWindow from '../Modal/ModalWindow';

const Main = () => {
  const dispatch = useDispatch();

  const { status, words } = useSelector((state: RootState) => state.words);
  const { modal } = useSelector((state: RootState) => state.modal);
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getUserList(id)
      .then((res) => {
        dispatch(setList(Object.entries(res.val())));
      })
      .catch((error) => console.log(error));
  }, [dispatch, id]);

  return (
    <div className={styles.main}>
      <div className="container">
        {modal && <ModalWindow />}

        <Search />
        {status === 'success' && words.definitions.length >= 1 && <Word />}
        <Image />
      </div>
    </div>
  );
};

export default Main;
