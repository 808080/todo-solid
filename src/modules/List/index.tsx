import { closestCenter, DragDropProvider, DragDropSensors, Draggable, DragOverlay, Droppable, SortableProvider } from '@thisbeyond/solid-dnd';
import { Component, createSignal, For } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';
import ListItem from '../../components/ListItem';
import { Store } from '../../utils/store';
import { Todo, TodoList } from '../../utils/types';

type ListProps = {
  setState: SetStoreFunction<Store>;
  allTodos: TodoList;
  filteredTodos: { todos: TodoList, count: number };
};

type Drag<T = void> = (dnd: { draggable: Draggable, droppable: Droppable }) => T;

const List: Component<ListProps> = (props) => {
  const idsMapped = props.allTodos.map(i => i.id);

  const [activeItem, setActiveItem] = createSignal<Todo>(null);
  const onDragStart: Drag<Todo> = ({ draggable }) => setActiveItem(props.filteredTodos.todos.find((t) => t.id === draggable.id));
  const ids = () => idsMapped;

  const onDragEnd: Drag = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = props.allTodos;
      const fromIndex = currentItems.findIndex((t) => t.id === draggable.id);
      const toIndex = currentItems.findIndex((t) => t.id === droppable.id);
      if (fromIndex !== toIndex) {
        const updatedItems = currentItems.slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        props.setState('todos', updatedItems);
      }
    }
    setActiveItem(null);
  };

  return (
    <DragDropProvider
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetector={closestCenter}
    >
      <DragDropSensors>
        <ul>
          <SortableProvider ids={ids()}>
            <For each={props.filteredTodos.todos}>
              {(todo) => {
                return (
                  <ListItem
                    {...todo}
                    allTodos={props.allTodos}
                    setText={(text, index) => props.setState('todos', index, { text })}
                    setDone={(done, index) => props.setState('todos', index, { done })}
                    delete={() => props.setState('todos', (todos) => todos.filter((t) => t.id !== todo.id))}
                  />
                );
              }}
            </For>
          </SortableProvider>
        </ul>
        <DragOverlay>
          <li class="sortable">{activeItem()?.text}</li>
        </DragOverlay>
        <p>{props.filteredTodos.count} todo(s) in the list</p>
      </DragDropSensors>
    </DragDropProvider>
  );
};

export default List;