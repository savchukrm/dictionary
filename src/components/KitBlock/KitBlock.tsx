import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import KitElement from './KitElement/KitElement';

import styles from './KitBlock.module.css';

interface KitBlockProps {
  folderName: string | undefined;
}

const KitBlock: React.FC<KitBlockProps> = ({ folderName }) => {
  const { terms } = useSelector((state: RootState) => state.folder);

  return (
    <div className={styles.container}>
      {terms.map((item, i) => {
        const { definition, meaning } = item;

        return (
          <li key={i}>
            <KitElement
              index={i}
              definition={definition}
              meaning={meaning}
              folderName={folderName}
            />
          </li>
        );
      })}
    </div>
  );
};

export default KitBlock;
