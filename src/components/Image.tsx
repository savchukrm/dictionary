import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { RootState } from '../redux/store';

const Image = () => {
  const { words, status } = useSelector((state: RootState) => state.words);
  const { mode } = useSelector((state: RootState) => state.mode);

  const isDesktop = useMediaQuery({ maxWidth: 650 });

  return (
    <div>
      {status === '' && (
        <img
          width={500}
          height={500}
          src={
            mode === 'dark' ? '/img/search-light.png' : '/img/search-dark.png'
          }
          alt="search"
        />
      )}

      {status === 'loading' &&
        (!isDesktop ? (
          <img
            width={500}
            height={500}
            src={
              mode === 'dark'
                ? '/img/Loading-light.png'
                : '/img/Loading-dark.png'
            }
            alt="loading"
          />
        ) : (
          <img
            width={500}
            height={500}
            src={
              mode === 'dark'
                ? '/img/Loading-small-light.png'
                : '/img/Loading-small-dark.png'
            }
            alt="loading"
          />
        ))}

      {status === 'success' && words.results.length === 0 && (
        <div className="sorry">
          <h3>You have no matching search terms.</h3>
          <h4>Please make sure that you entered the word correctly.</h4>
          <img
            width={300}
            height={300}
            src={
              mode === 'dark'
                ? '/img/sorry-pana-light.png'
                : '/img/sorry-pana-dark.png'
            }
            alt="sorry"
          />
        </div>
      )}
    </div>
  );
};

export default Image;
