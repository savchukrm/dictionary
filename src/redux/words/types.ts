export enum Status {
  NOTHING = '',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type DefinitionsItem = {
  definition: string;
  partOfSpeech: string;
  synonyms: string[] | string;
};

export type DataItem = {
  results: DefinitionsItem[];
  pronunciation: { all: string };
  word: string;
};

export interface DataSliceState {
  words: DataItem;
  status: Status;
}
