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
  definitions: DefinitionsItem[];
  pronunciation: string;
  word: string;
  examples: [];
};

export interface DataSliceState {
  words: DataItem;
  status: Status;
}
