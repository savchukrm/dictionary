import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { useAuth } from '../../hooks/use-auth';

import Search from '../../components/Search/Search';
import Image from '../../components/Image';
import Word from '../../components/Word/Word';

import styles from './Main.module.css';

const Main = () => {
  const { status, words } = useSelector((state: RootState) => state.words);
  const { isAuth, email } = useAuth();

  return (
    <div className={styles.main}>
      <div className="container">
        <Search />
        {status === 'success' && words.definitions.length >= 1 && <Word />}
        <Image />
      </div>
    </div>
  );
};

export default Main;
