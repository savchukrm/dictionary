import { useSelector } from 'react-redux';

import Search from '../../components/Search/Search';
import Image from '../../components/Image';
import Word from '../../components/Word/Word';

import styles from './Main.module.css';

const Main = () => {
  const { status, words } = useSelector((state) => state.words);

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
