import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { SituationProvider } from "./context/situation.context";
import "./style.css";

ReactDOM.render(
  <React.StrictMode>
    <SituationProvider>
      <App />
    </SituationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
