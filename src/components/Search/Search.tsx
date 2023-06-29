import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../redux/store';

import { CgClose } from 'react-icons/cg';

import { searchWord } from '../../redux/search/slice';
import { fetchWords } from '../../redux/words/asynAction';
import { addWordToPreviousRequests } from '../../utils/requests/previousRequest';

import styles from './Search.module.css';

const Search = () => {
  const dispatch = useAppDispatch();

  const [validForm, setValidForm] = useState(false);
  const [error, setError] = useState('');

  const { word } = useSelector((state: RootState) => state.search);
  const { id } = useSelector((state: RootState) => state.user);
  const { status } = useSelector((state: RootState) => state.words);

  useEffect(() => {
    if (word.length >= 1) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [word]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (error || word.trim() === '') {
      return;
    }

    await dispatch(fetchWords(word));
    dispatch(searchWord(''));
  };

  useEffect(() => {
    if (id !== null && status === 'success') {
      addWordToPreviousRequests(id, word);
    }
  }, [status]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(value)) {
      setError('Invalid input');
    } else {
      setError('');
    }
    dispatch(searchWord(value));
  };

  const clearForm = () => {
    dispatch(searchWord(''));
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <input
            className={styles.formInput}
            type="text"
            value={word}
            placeholder="Input word..."
            onChange={handleChange}
            maxLength={100}
          />

          {word.length > 0 && (
            <button onClick={() => clearForm()} className={styles.clearBtn}>
              <CgClose />
            </button>
          )}
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button
          disabled={validForm || !!error}
          className={styles.formBtn}
          type="submit"
        >
          Search
        </button>
      </form>
    </>
  );
};

export default Search;
