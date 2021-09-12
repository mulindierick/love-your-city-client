import React from "react";
import Campaign from "../components/Campaign";
const Campaigns = () => {
  return (
    <div className="campaigns-page">
      <div className="campaigns-header">
        <div className="ch-1">
          <h4>Your campaigns</h4>
          <p>Monitor and track your campaign progress</p>
        </div>
        <button className="ch-2">+ Add Camapaign</button>
      </div>
      <div className="all-your-campaigns">
        <Campaign />
        <Campaign />
        <Campaign />
        <Campaign />
      </div>
    </div>
  );
};

export default Campaigns;
