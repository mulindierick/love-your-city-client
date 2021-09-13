import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Campaign from "../components/Campaign";

const Campaigns = () => {
  let [campaigns, setCampaigns] = useState(null);
  let history = useHistory();

  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));

    !user
      ? history.push("/")
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
            console.log(res);
            setCampaigns(res);
          })
          .catch((error) => console.log(error));
  }, [history]);

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
