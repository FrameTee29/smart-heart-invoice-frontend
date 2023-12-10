import { action } from 'easy-peasy';
import { CounterModel, CounterModelState } from './counter.type';

const initialState: CounterModelState = {
  count: 0,
};

const createCounterStore = (): CounterModel => ({
  ...initialState,
  increase: action((state) => {
    state.count += 1;
  }),
  decrease: action((state) => {
    state.count -= 1;
  }),
});

export default createCounterStore;
