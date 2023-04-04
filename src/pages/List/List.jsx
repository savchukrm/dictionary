import { useSelector } from 'react-redux';

import Set from '../../components/Set/Set';

const List = () => {
  const { list } = useSelector((state) => state.list);

  return (
    <div>
      {list.length === 0 ? <p>you do not have any saved items</p> : <Set />}
    </div>
  );
};

export default List;
