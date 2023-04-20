import { createAsyncThunk } from '@reduxjs/toolkit';

import { DataWordState } from '../search/slice';

import axios from 'axios';

const API_KEY = process.env.REACT_APP_DICTIONARY_API_KEY;

export const fetchWords = createAsyncThunk(
  'words/fetchWordsStatus',
  async (param: DataWordState) => {
    const options = {
      method: 'GET',
      url: `https://wordapi18v1.p.rapidapi.com/words/${param}`,
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);

    return response.data;
  }
);
