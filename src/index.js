import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { API_KEY, SESSION_ID, TOKEN } from "./config";
import App from "./App";
import "@opentok/client";

function renderApp(credentials) {
  ReactDOM.render(
    <App credentials={credentials} />,
    document.getElementById("root")
  );
}

if (API_KEY && TOKEN && SESSION_ID) {
  renderApp({
    apiKey: API_KEY,
    sessionId: SESSION_ID,
    token: TOKEN,
  });
}
