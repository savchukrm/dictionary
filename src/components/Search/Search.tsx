import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../redux/store';

import { searchWord } from '../../redux/search/slice';
import { fetchWords } from '../../redux/words/asynAction';

import styles from './Search.module.css';
const Search = () => {
  const dispatch = useAppDispatch();

  const { word } = useSelector((state: RootState) => state.search);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(fetchWords(word));
    dispatch(searchWord(''));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchWord(event.target.value));
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
        <input className={styles.formBtn} type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
