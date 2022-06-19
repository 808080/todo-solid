import type { Component, JSX } from 'solid-js';

type ButtonProps = {
  text: string;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: Component<ButtonProps> = (props) => {
  return (
    <button onClick={props.onClick} type={props.type}>
      {props.text}
    </button>
  );
};

export default Button;