import { render } from 'solid-js/web';
import App from './App';
import './style.scss';

render(() => <App />, document.getElementById('root'));

/*
feature list

mandatory:
  add item
  remove item
  check item (mark done)
  sort items (all, done, active)
  display items count
optional:
  edit item
  persistent items (local storage)
  order items with drag'n'drop
*/