import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import {ResizablePanels, TreeView} from "corrosive-components";

export default component$(() => {
  return (<ResizablePanels defaultOffset={20}>
    <TreeView className={'whitespace-nowrap'} nodes={[
      {
        id: '1',
        label: 'Node 1',
        children: [
          {
            id: '1.1',
            label: 'Node 1.1',
          },
          {
            id: '1.2',
            label: 'Node 1.2',
            children: [
              {
                id: '1.2.1',
                label: 'Node 1.2.1',
              },
              {
                id: '1.2.2',
                label: 'Node 1.2.2',
              },
            ],
          },
        ],
      },
      {
        id: '2',
        label: 'Node 2',
        children: [
          {
            id: '2.1',
            label: 'Node 2.1',
          },
        ],
      },
    ]} q:slot={'firstPanel'}></TreeView>

  </ResizablePanels>);
})

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
