import { createAsyncThunk } from '@reduxjs/toolkit';

import { DataWordState } from '../search/slice';

import axios from 'axios';

import { key } from '../../key';

export const fetchWords = createAsyncThunk(
  'words/fetchWordsStatus',
  async (param: DataWordState) => {
    const options = {
      method: 'GET',
      url: `https://wordapi18.p.rapidapi.com/words/${param}`,
      headers: {
        'X-RapidAPI-Key': key.id,
        'X-RapidAPI-Host': 'wordapi18.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);

    return response.data;
  }
);
