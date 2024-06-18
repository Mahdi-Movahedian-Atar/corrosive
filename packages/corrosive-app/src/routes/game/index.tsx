import {component$, useComputed$, useSignal, useTask$, useVisibleTask$} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import {ResizablePanels, TreeView} from "corrosive-components";

export default component$(() => {

  return (<div>
    <script src={'http://localhost:5173/gg/index.js'}/>
    <iframe
        src={'http://localhost:5173/gg/index.html'} // replace with your actual Godot HTML file
        title="Godot Game"
        width="800"
        height="600"
        frameBorder="0"
    />
  </div>);
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
