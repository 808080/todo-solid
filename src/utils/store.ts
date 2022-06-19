import { createEffect } from 'solid-js';
import { createStore, SetStoreFunction } from 'solid-js/store'
import { Filters, TodoList } from './types';

export type Store = {
  idCounter: number;
  todos: TodoList;
  newItem: string;
  filter: Filters;
};

const createLocalStore = (initState: Store): [Store, SetStoreFunction<Store>] => {
  const [state, setState] = createStore(initState);
  const store = JSON.parse(localStorage.getItem('state'));
  if (store) setState(store);
  createEffect(() => localStorage.setItem('state', JSON.stringify(state)));
  return [state, setState];
}

export default createLocalStore;