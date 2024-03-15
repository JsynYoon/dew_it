import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TodoProvider } from "./context/TodoProvider.tsx";
import ToasterProvider from "./providers/ToasterProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TodoProvider>
      <ToasterProvider />
      <App />
    </TodoProvider>
  </React.StrictMode>
);
