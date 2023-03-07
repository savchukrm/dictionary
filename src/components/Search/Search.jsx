import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';

import { searchWord } from '../../redux/search/slice';
import { fetchWords } from '../../redux/words/asynAction';

import styles from './Search.module.css';

const Search = () => {
  const dispatch = useAppDispatch();

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
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <input
            className={styles.formInput}
            type="text"
            value={word}
            placeholder="Input word..."
            onChange={handleChange}
          />
        </label>
        <input
          className={styles.formBtn}
          type="submit"
          value="Search"
          onClick={getData}
        />
      </form>
    </>
  );
};

export default Search;
