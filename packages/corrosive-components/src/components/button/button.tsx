import { component$, Slot } from "@builder.io/qwik";

export interface ButtonProps {
  class?: string;
  disabled?: boolean;
  label?: string
}
export const Button = component$<ButtonProps>((props) => {
  return (
    <button
      class={props.class}
      disabled={props.disabled}
    >
      <div className={"align-middle justify-center m-2"}>
        <Slot></Slot>
      </div>
    </button>
  );
});
