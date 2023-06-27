import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../redux/store';

import { setLastRequests } from '../../redux/requests/slice';

import { getUserRequests } from '../../utils/requests/previousRequest';

import styles from './Requests.module.css';

const Requests = () => {
  const dispatch = useAppDispatch();

  const { id } = useSelector((state: RootState) => state.user);
  const { status } = useSelector((state: RootState) => state.words);
  const requests = useSelector((state: RootState) => state.requests);

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
  }, [id, dispatch, status]);

  return <ul>place for dispalying last requests</ul>;
};

export default Requests;
