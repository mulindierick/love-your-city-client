import React from "react";
function Campaign({ campaign }) {
  return (
    <div className="campaign-grouping">
      {/* add general stats tab */}
      <div className="progress-group">
        <p className=" pg pg-1">80%</p>
        <div className="pg  pg-2">
          <p className="pg-2-3">{campaign.campaign_title}</p>
          <p className="pg-2-2">1,273 of 2,000 items raised</p>
        </div>
        <div className=" pg pg-3">
          <p className="pg-2-3">23/05/2021</p>
          <p className="pg-2-2">End Date</p>
        </div>
      </div>
      <div className="c-progress-line">
        <div className="c-progress-line-1"></div>
      </div>
      <div className="c-button-g">
        <button className="cb cb-1">Stats</button>
        <button className="cb cb-2">View</button>
        {/* //stats, view or a manage button */}
      </div>
    </div>
  );
}

export default Campaign;
