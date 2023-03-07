import { useSelector } from 'react-redux';

const Image = () => {
  const { words, status } = useSelector((state) => state.words);

  return (
    <div>
      {status === '' && (
        <img width={500} height={500} src="/img/search-light.png" alt="" />
      )}

      {status === 'loading' && (
        <img width={500} height={500} src="/img/Loading-dark.png" alt="" />
      )}

      {status === 'success' && words.definitions.length === 0 && (
        <div>
          <img width={300} height={300} src="/img/sorry-pana-dark.png" alt="" />
        </div>
      )}
    </div>
  );
};

export default Image;
