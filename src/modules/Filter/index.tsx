import { Component, For } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';
import Button from '../../components/Button';
import { Store } from '../../utils/store';
import { Filters, FilterOption } from '../../utils/types';

type FilterProps = {
  setState: SetStoreFunction<Store>;
};

const Filter: Component<FilterProps> = (props) => {

  const handleClick = (filter: Filters) => () => {
    props.setState({ filter });
  };

  return (
    <div>
      <For each={Object.keys(Filters)}>
        {(option: FilterOption) => (
          <Button type='button' text={option} onClick={handleClick(Filters[option])} />
        )}
      </For>
    </div>
  );
};

export default Filter;