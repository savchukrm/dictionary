import KitElement from './KitElement/KitElement';

import styles from './KitBlock.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const KitBlock = () => {
  const { terms } = useSelector((state: RootState) => state.folder);

  return (
    <div className={styles.container}>
      {terms.map((item, i) => {
        const { definition, meaning } = item;

        return (
          <li key={i}>
            <KitElement definition={definition} meaning={meaning} />
          </li>
        );
      })}
    </div>
  );
};

export default KitBlock;
