import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import StoreProvider from "./store/StoreProvider";
import reducer from "./store/reducer";

const initialState = {
  user: null,
};

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider initialState={initialState} reducer={reducer}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
