import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import App from "./App";
import CampaignContextProvider from "./contexts/CampaignContext";

ReactDOM.render(
  <React.StrictMode>
    <CampaignContextProvider>
      <App />
    </CampaignContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
