import { component$, Slot } from "@builder.io/qwik";

export interface ButtonProps {
  class?: string;
  disabled?: boolean;
  label?: string;
}
export const Button = component$<ButtonProps>((props) => {
  return (
    <button class={props.class} disabled={props.disabled}>
      <div className={"m-9 justify-center align-middle"}>
        <Slot></Slot>
      </div>
    </button>
  );
});
