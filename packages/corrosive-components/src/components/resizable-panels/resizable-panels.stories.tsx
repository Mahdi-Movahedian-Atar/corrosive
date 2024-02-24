import type { Meta, StoryObj } from "storybook-framework-qwik";
import { ResizablePanels, ResizablePanelsProps } from "./resizable-panels";

const meta: Meta<ResizablePanelsProps> = {
  component: ResizablePanels,
};

type Story = StoryObj<ResizablePanelsProps>;

export default meta;

export const Primary: Story = {
  args: {
    horizontal: false,
    min: 0,
    max: 100,
    storageKey: undefined,
    className: "h-screen",
  },
  render: (props) => (
    <div>
      sadsdasdadsasdasd
      <ResizablePanels {...props} />
    </div>
  ),
};
