import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { RootState } from '../redux/store';

const Image: React.FC = () => {
  const { words, status } = useSelector((state: RootState) => state.words);

  const isDesktop = useMediaQuery({ maxWidth: 650 });

  return (
    <div>
      {status === '' && (
        <img
          width={500}
          height={500}
          src={process.env.REACT_APP_PUBLIC_URL + '/img/search-light.png'}
          alt="search"
        />
      )}

      {status === 'loading' &&
        (!isDesktop ? (
          <img
            width={500}
            height={500}
            src={process.env.REACT_APP_PUBLIC_URL + '/img/Loading-light.png'}
            alt="loading"
          />
        ) : (
          <img
            width={500}
            height={500}
            src={
              process.env.REACT_APP_PUBLIC_URL + '/img/Loading-small-light.png'
            }
            alt="loading"
          />
        ))}

      {((status === 'error' && !words.word) ||
        (status === 'success' && !words.results)) && (
        <div className="sorry">
          <h3>You have no matching search terms.</h3>
          <h4>Please make sure that you've entered the word correctly.</h4>
          <img
            width={300}
            height={300}
            src={process.env.REACT_APP_PUBLIC_URL + '/img/sorry-pana-light.png'}
            alt="sorry"
          />
        </div>
      )}
    </div>
  );
};

export default Image;
