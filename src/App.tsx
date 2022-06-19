import { Component } from 'solid-js';
import AddItem from './modules/AddItem';
import Filter from './modules/Filter';
import List from './modules/List';
import createLocalStore from './utils/store';
import { Filters, TodoList } from './utils/types';

const App: Component = () => {

  const [state, setState] = createLocalStore({
    todos: [],
    newItem: '',
    idCounter: 0,
    filter: Filters.All
  });

  const filterList = (todos: TodoList): { todos: TodoList, count: number } => {
    let res = [];
    if (state.filter === Filters.Done) res = todos.filter((t) => t.done);
    else if (state.filter === Filters.Active) res = todos.filter((t) => !t.done);
    else res = todos;
    return { todos: res, count: res.length };
  };

  return (
    <div>
      {state.filter}
      <AddItem state={state} setState={setState} />
      <List filteredTodos={filterList(state.todos)} allTodos={state.todos} setState={setState} />
      <Filter setState={setState} />
    </div>
  );
};

export default App;