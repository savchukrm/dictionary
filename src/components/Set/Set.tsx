import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

import styles from './Set.module.css';

function Set(): JSX.Element {
  const { list } = useSelector((state: RootState) => state.list);

  return (
    <div>
      {list.map((el: [string, { definition: string }[]], i: number) => (
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
