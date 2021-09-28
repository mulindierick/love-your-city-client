import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { CampaignContext } from "../contexts/CampaignContext";
import moment from 'moment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Campaign({ campaign }) {
  // console.log(campaign)
  const { setCampaign } = useContext(CampaignContext);
  const history = useHistory();
  const { campaign_id: campId, campaign_title: title, end_date: endDate, totalItems, donationTotal } = campaign
  const [campaignItems, setCampaignItems] = useState(campaign.campaignItems)
  const progressTotal = Math.ceil((donationTotal/totalItems)*100)

  function handlClick() {
    // sessionStorage.setItem("cId", JSON.stringify(`${campId}`));
    setCampaign(campaign)
    history.push(`/show-campaign/${campId}`);
  }

  return (
    <div className="campaign-grouping">
      <div className="progress-group">
        <p className=" pg pg-1">{progressTotal}%</p>
        <div className="pg  pg-2">
          <p className="pg-2-3">{title}</p>
          <p className="pg-2-2">{donationTotal} of {totalItems} items raised</p>
        </div>
        <div className=" pg pg-3">
          <p className="pg-2-3">{moment(endDate).format('DD/MM/YYYY')}</p>
          <p className="pg-2-2">End Date</p>
        </div>
      </div>
      <div className="c-progress-line">
        <div className="c-progress-line-1" style={{width: `${progressTotal}%`}}></div>
      </div>
      <div className="c-button-g" onClick={handlClick}>
        <p>Manage</p>
        <ExpandMoreIcon />
      </div>
    </div>
  );
}

export default Campaign;
