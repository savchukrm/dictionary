export enum Status {
  NOTHING = '',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface DataSliceState {
  words: {};
  status: Status;
}
