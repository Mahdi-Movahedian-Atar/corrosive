import type { Meta, StoryObj } from 'storybook-framework-qwik'
import { ResizablePanels, ResizablePanelsProps } from './resizable-panels'

const meta: Meta<ResizablePanelsProps> = {
    component: ResizablePanels,
}

type Story = StoryObj<ResizablePanelsProps>

export default meta

export const Primary: Story = {
    args: {
        horizontal: false,
        defaultOffset: 50,
        min: 0,
        max: 100,
        storageKey: undefined,
        className: 'h-screen',
    },
    render: (props) => (
        <div>
            <ResizablePanels {...props}>
                <div q:slot={'firstPanel'}>First Panel</div>
                <div q:slot={'secondPanel'}>Second Panel</div>
            </ResizablePanels>
        </div>
    ),
}
