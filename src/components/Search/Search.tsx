import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { CgClose } from 'react-icons/cg';

import { useAppDispatch, RootState } from '../../redux/store';
import { searchWord } from '../../redux/search/slice';
import { fetchWords } from '../../redux/words/asynAction';

import { addWordToPreviousRequests } from '../../utils/requests/previousRequest';
import styles from './Search.module.css';

const Search = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const [error, setError] = useState('');
  const [isActive, setIsActive] = useState(false);

  const { word } = useSelector((state: RootState) => state.search);
  const { id } = useSelector((state: RootState) => state.user);
  const { status } = useSelector((state: RootState) => state.words);

  useEffect(() => {
    searchButtonRef.current?.focus();
  }, []);

  const handleButtonClick = () => {
    if (!error && word.trim() !== '') {
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
        inputRef.current?.focus();
      }, 300);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (error || word.trim() === '') {
      return;
    }

    await dispatch(fetchWords(word.trim()));
    dispatch(searchWord(''));
  };

  useEffect(() => {
    if (id !== null && status === 'success') {
      addWordToPreviousRequests(id, word);
    }
  }, [id, status]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(false);
    const value = event.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(value)) {
      setError('Cannot use any symbols or numbers');
    } else {
      setError('');
    }
    dispatch(searchWord(value));
  };

  const clearForm = () => {
    dispatch(searchWord(''));
    setError('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' && (error || word.trim() === '')) {
      event.preventDefault();
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <input
            ref={inputRef}
            className={styles.formInput}
            type="text"
            value={word}
            placeholder="Input word..."
            onChange={handleChange}
            maxLength={100}
          />
          {error && <p className={styles.error}>{error}</p>}
          {word.length > 0 && (
            <div onClick={clearForm} className={styles.clearBtn}>
              <CgClose />
            </div>
          )}
        </label>

        <button
          ref={searchButtonRef}
          disabled={!!error || word.trim().length === 0}
          className={`${styles.formBtn} ${error ? styles.disabled : ''} ${
            isActive ? styles.active : ''
          }`}
          type="submit"
          onClick={handleButtonClick}
          onKeyDown={handleKeyDown}
        >
          Search
        </button>
      </form>
    </>
  );
};

export default Search;
