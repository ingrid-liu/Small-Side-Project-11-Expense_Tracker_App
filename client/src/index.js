import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Now we can access the central store  from any component of your react application
  <Provider store={store}>
    <App />
  </Provider>
  // pass the App component into the Provider, we need to pass here the redux store
  // document.getElementById("root")
);

reportWebVitals();
