import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./styles.css";
import App from "./components/App";

let reducer = (state, action) => {
  if (action.type === "login") {
    return { ...state, loggedIn: true, username: action.username };
  }
  if (action.type === "logout") {
    return { ...state, loggedIn: false, username: " " };
  }
  return state;
};

const store = createStore(
  reducer,
  { loggedIn: false, username: "" },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

export default store;
