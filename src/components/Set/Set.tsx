import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

import styles from './Set.module.css';

function Set(): JSX.Element {
  const { favorite } = useSelector((state: RootState) => state.favorite);

  return (
    <div>
      {favorite.map((el: [string, { definition: string }[]], i: number) => (
        <div className={styles.setBlock} key={i}>
          <h3>{el[0]}</h3>
          {el[1].slice(0, 1).map((obj: { definition: string }, i: number) => (
            <p key={i}>{obj.definition}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Set;
