import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Campaign from "../components/Campaign";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import Header from "./Header";
import CircularProgress from "@mui/material/CircularProgress";

const Campaigns = () => {
  const { campaigns, setCampaigns } = useContext(CampaignContext);
  let history = useHistory();
  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));

    // https://love-your-city-app.herokuapp.com
    // http://localhost:5000
    !user
      ? history.push("/log-in")
      : fetch(
          `https://love-your-city-app.herokuapp.com/users/${user["user_id"]}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log(data)

            // Sorting Campaign Data on Front End
            let fullCampaignData = data.campaigns;

            fullCampaignData.forEach((el) => {
              let specificItems = data.campaign_items.filter(
                (item) => item.campaign_title === el.campaign_title
              );
              let specificDonations = data.donation_items.filter(
                (item) => item.campaign_title === el.campaign_title
              );
              let specificDonationTotal = data.donations_total.filter(
                (item) => item.campaign_title === el.campaign_title
              );
              let specificItemTotal = data.item_total.filter(
                (item) => item.campaign_title === el.campaign_title
              );

              el["campaignItems"] = specificItems;
              el["donationItems"] = specificDonations;
              el["totalItems"] = parseInt(specificItemTotal[0].total);
              el["donationTotal"] =
                specificDonationTotal.length !== 0
                  ? parseInt(specificDonationTotal[0].total)
                  : 0;
            });

            setCampaigns(fullCampaignData);
          })
          .catch((error) => console.log(error));
  }, [history, setCampaigns]);

  return (
    <div className="campaigns-page">
      <Header />
      <div className="campaigns-header">
        <div className="ch-1">
          <h4>Monitor Your Campaigns</h4>
        </div>
        <button
          className="ch-2"
          onClick={() => history.push("/register-campaign")}
        >
          + Add Campaign
        </button>
      </div>
      <div className="all-your-campaigns">
        {campaigns ? (
          campaigns.map((campaign, index) => {
            return <Campaign key={index} campaign={campaign} />;
          })
        ) : (
          <>
            <CircularProgress disableShrink />
          </>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
