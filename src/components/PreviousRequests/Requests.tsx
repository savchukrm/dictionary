import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../redux/store';

import { setLastRequests } from '../../redux/requests/slice';
import { fetchWords } from '../../redux/words/asynAction';

import { getUserRequests } from '../../utils/requests/previousRequest';

const Requests = () => {
  const dispatch = useAppDispatch();

  const { id } = useSelector((state: RootState) => state.user);
  const { status } = useSelector((state: RootState) => state.words);
  const { lastRequests } = useSelector((state: RootState) => state.requests);

  useEffect(() => {
    if (id !== null) {
      getUserRequests(id)
        .then((res) => {
          if (res.val() != null) {
            dispatch(setLastRequests(Object.entries(res.val())));
          }
        })
        .catch((error) => console.log(error));
    }
  }, [id, status]);

  const allRequests = lastRequests
    .slice(0, 10)
    .map((item) => item[1])
    .filter((item, index, arr) => {
      return item !== '' && arr.lastIndexOf(item) === index;
    });

  if (lastRequests.length === 1 && lastRequests[0][0] === 'createdAt') {
    return null;
  }

  return (
    <ul className="request-block">
      {allRequests.map((item, i) => (
        <li
          className="request-item"
          key={i}
          onClick={() => dispatch(fetchWords(item))}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Requests;
