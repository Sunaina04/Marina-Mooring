import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { TitleProvider } from "./Components/hooks/useTitle";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <TitleProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TitleProvider>
);

reportWebVitals();
