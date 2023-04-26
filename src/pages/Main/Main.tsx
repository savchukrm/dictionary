import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

import Search from '../../components/Search/Search';
import Image from '../../components/Image';
import Word from '../../components/Word/Word';

import styles from './Main.module.css';
import ModalInput from '../../components/ModalInput/ModalInput';

const Main = (): JSX.Element => {
  const { status, words } = useSelector((state: RootState) => state.words);

  const [isNewList, setIsNewList] = useState<boolean>(false);

  return (
    <div className={styles.main}>
      {isNewList && <ModalInput setIsNewList={setIsNewList} />}

      <div className="container">
        <Search />
        {status === 'success' && words.results && <Word />}
        <Image />
      </div>
    </div>
  );
};

export default Main;
