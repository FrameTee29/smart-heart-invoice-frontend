import { createStore, createTypedHooks } from 'easy-peasy';

import storeDefinition, { StoreModel } from './model';

const store = createStore<StoreModel>(storeDefinition);

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
