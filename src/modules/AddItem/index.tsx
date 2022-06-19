import { JSX } from 'solid-js';
import Button from '../../components/Button';
import { ComponentWithState } from '../../utils/types';

const AddItem: ComponentWithState = (props) => {

  const addItem: EventListener = (e) => {
    e.preventDefault();
    if (!props.state.newItem) return;

    props.setState({
      idCounter: props.state.idCounter + 1,
      todos: [...props.state.todos, { id: props.state.idCounter, text: props.state.newItem, done: false }],
      newItem: ''
    });
  };

  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    props.setState({ newItem: e.currentTarget.value.trim() });
  };

  return (
    <form onSubmit={addItem}>
      <input type='text' onInput={handleInput} placeholder='Better take a note ;)' value={props.state.newItem} />
      <Button text='Add' type='submit' />
    </form>
  );
};

export default AddItem;