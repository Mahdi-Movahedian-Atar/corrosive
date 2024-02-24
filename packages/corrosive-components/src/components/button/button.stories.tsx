import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Button, type ButtonProps } from "./button";

const meta: Meta<ButtonProps> = {
  component: Button,
};

type Story = StoryObj<ButtonProps>;

export default meta;

export const Primary: Story = {
  args: {
    class: "bb",
    disabled: false,
    label: "bb",
  },
  render: (props) => (
    <Button {...props}>
      <h1 class={"m-9"}>bb</h1>
    </Button>
  ),
};
