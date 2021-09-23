import React, { useState } from "react";
import { useHistory } from "react-router";
import moment from 'moment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Campaign({ campaign }) {
  console.log(campaign)
  const history = useHistory();
  const { campaign_id: campId, campaign_title: title, end_date: endDate, required_item_total: totalItems } = campaign
  const [campaignItems, setCampaignItems] = useState(null)

  // const fetchItems = async () => {
  //   const res = await fetch()
  // }

  function handlClick() {
    sessionStorage.setItem("cId", JSON.stringify(`${campaign.campaign_id}`));
    history.push("/show-campaign");
  }

  return (
    <div className="campaign-grouping">
      <div className="progress-group">
        <p className=" pg pg-1">80%</p>
        <div className="pg  pg-2">
          <p className="pg-2-3">{title}</p>
          <p className="pg-2-2">5 of {totalItems} items raised</p>
        </div>
        <div className=" pg pg-3">
          <p className="pg-2-3">{moment().format('DD/MM/YYYY')}</p>
          <p className="pg-2-2">End Date</p>
        </div>
      </div>
      <div className="c-progress-line">
        <div className="c-progress-line-1"></div>
      </div>
      <div className="c-button-g" onClick={handlClick}>
        <p>Manage</p>
        <ExpandMoreIcon />
      </div>
    </div>
  );
}

export default Campaign;
