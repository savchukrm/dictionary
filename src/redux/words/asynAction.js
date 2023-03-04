import { createAsyncThunk } from '@reduxjs/toolkit';

import { key } from '../../key';
import axios from 'axios';

export const fetchWords = createAsyncThunk(
  'words/fetchWordsStatus',
  async () => {
    const options = {
      method: 'GET',
      url: `https://wordapi18.p.rapidapi.com/words/mother`,
      headers: {
        'X-RapidAPI-Key': key.id,
        'X-RapidAPI-Host': 'wordapi18.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    console.log(response.data);

    return response.data;
  }
);
