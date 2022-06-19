import { createSortable } from '@thisbeyond/solid-dnd';
import { Component, createSignal, JSX, Show } from 'solid-js';
import { Todo, TodoList } from '../../utils/types';
import Button from '../Button';

type ListItemProps = Todo & {
  setDone: (done: boolean, index: number) => void;
  setText: (text: string, index: number) => void;
  delete: () => void;
  allTodos: TodoList;
};

const ListItem: Component<ListItemProps> = (props) => {

  const [isEdit, setEdit] = createSignal(false);
  const sortable = createSortable(props.id);


  const handleBlur: JSX.EventHandler<HTMLInputElement, FocusEvent> = (e) => {
    const val = e.currentTarget.value.trim();
    if (val) {
      const index = props.allTodos.findIndex((t) => t.id === props.id);
      props.setText(val, index);
    }
    setEdit(false);
  };

  return (
    <li use:sortable classList={{ done: props.done, drag: sortable.isActiveDraggable }}>
      <input
        type='checkbox'
        checked={props.done}
        onChange={(e: Event) => {
          const elem = e.currentTarget as HTMLInputElement;
          const index = props.allTodos.findIndex((t) => t.id === props.id);
          props.setDone(elem.checked, index);
        }}
      />
      <Show
        when={isEdit()}
        fallback={<span ondblclick={() => setEdit(true)}>{props.text}</span>}
      >
        <input type='text' value={props.text} onBlur={handleBlur} />
      </Show>
      <Button
        text='✘'
        type='button'
        onClick={props.delete}
      />
    </li>
  );
};

export default ListItem;