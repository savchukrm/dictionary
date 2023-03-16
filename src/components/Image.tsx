import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Image = () => {
  const { words, status } = useSelector((state: RootState) => state.words);

  return (
    <div>
      {status === '' && (
        <img width={500} height={500} src="/img/search-light.png" alt="" />
      )}

      {status === 'loading' && (
        <img width={500} height={500} src="/img/Loading-dark.png" alt="" />
      )}

      {status === 'success' && words.definitions.length === 0 && (
        <div className="sorry">
          <h3>You have no matching search terms.</h3>
          <h4> Please make sure that you entered the word correctly.</h4>
          <img
            width={300}
            height={300}
            src="/img/sorry-pana-light.png"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default Image;
