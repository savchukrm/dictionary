import { useSelector } from 'react-redux';

import styles from './Set.module.css';

function Set() {
  const { list } = useSelector((state) => state.list);

  return (
    <div>
      {list.map((el, i) => (
        <div className={styles.setBlock} key={i}>
          <h3>{el[0]}</h3>
          {el[1].slice(0, 1).map((obj, i) => (
            <p key={i}>{obj.definition}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Set;
