import React from "react";
import {createRoot }from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/index";
import { Provider } from "react-redux";


const root  = createRoot( document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
   
      <App />
  
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

