import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

import Search from '../../components/Search/Search';
import Image from '../../components/Image';
import Word from '../../components/Word/Word';

import styles from './Main.module.css';
import ModalWindow from '../Modal/ModalWindow';

const Main = () => {
  const { status, words } = useSelector((state: RootState) => state.words);
  const { modal } = useSelector((state: RootState) => state.modal);

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
