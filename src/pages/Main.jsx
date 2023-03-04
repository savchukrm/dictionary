import { useSelector } from 'react-redux';

import { useAppDispatch } from '../redux/store';

import { fetchWords } from '../redux/words/asynAction';

const Main = () => {
  const dispatch = useAppDispatch();

  const { words } = useSelector((state) => state.words);

  const getData = async () => {
    dispatch(fetchWords());
  };

  const onCheck = () => {
    words.definitions.map((obj) => console.log(obj.definition));
  };

  return (
    <div>
      <button onClick={getData}>click</button>
      <button onClick={onCheck}>click</button>
    </div>
  );
};

export default Main;
