import { Action } from 'easy-peasy';

export interface CounterModelState {
  count: number;
}

export interface CounterModel extends CounterModelState {
  increase: Action<this>;
  decrease: Action<this>;
}
