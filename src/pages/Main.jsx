import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { fetchWords } from '../redux/words/asynAction';
import { searchWord } from '../redux/search/slice';

const Main = () => {
  const dispatch = useAppDispatch();

  const { words, status } = useSelector((state) => state.words);
  const { word } = useSelector((state) => state.search);

  const handleChange = (event) => {
    dispatch(searchWord(event.target.value));
  };

  function handleSubmit(event) {
    event.preventDefault();
  }

  const getData = async () => {
    dispatch(fetchWords(word));
    dispatch(searchWord(''));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={word}
            placeholder="Input word..."
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" onClick={getData} />
      </form>
      <img width={500} height={500} src="/img/search-dark.png" alt="" />

      {status === 'success' &&
        words.definitions.map((obj, i) => <p key={i}> {obj.definition} </p>)}
      {status === 'success' && words.definitions.length === 0 && (
        <div>
          <img width={300} height={300} src="/img/sorry-pana-dark.png" alt="" />
        </div>
      )}
    </div>
  );
};

export default Main;
