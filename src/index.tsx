import React, { createElement } from "react";
import ReactDOM, { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { hydrate } from "react-dom";
import { fetchTodo } from "./Lectures/SSR/fetch";

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// reportWebVitals();

async function main() {
  const result = await fetchTodo();
  const app = <App todos={result} />;
  const container = document.getElementById("app");
  const root = hydrateRoot(container!, app);
}
main();
