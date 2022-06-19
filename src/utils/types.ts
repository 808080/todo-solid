import { Component } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';
import { Store } from './store'

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export enum Filters {
  All = 'All',
  Active = 'Active',
  Done = 'Done'
};

export type FilterOption = keyof typeof Filters;

type State = {
  state: Store;
  setState: SetStoreFunction<Store>;
};

export type TodoList = Array<Todo>;

export type ComponentWithState = Component<State>;

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      sortable: boolean;
    }
  }
};