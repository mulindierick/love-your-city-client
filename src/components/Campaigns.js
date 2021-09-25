import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Campaign from "../components/Campaign";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import Header from "./Header";

const Campaigns = () => {
  const { campaigns, setCampaigns } = useContext(CampaignContext);
  let history = useHistory();
  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));

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
          .then((res) => {
            setCampaigns(res);
          })
          .catch((error) => console.log(error));
  }, [history, setCampaigns]);

  return (
    <div className="campaigns-page">
       <Header/>
      <div className="campaigns-header">
        <div className="ch-1">
          <h4>Your campaigns</h4>
          <p>Monitor and track your campaign progress</p>
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
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
