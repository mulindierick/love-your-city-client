import React from "react";
import ReactDOM from "react-dom";
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
