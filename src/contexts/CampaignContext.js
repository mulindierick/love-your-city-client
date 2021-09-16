import React, { createContext, useState } from "react";
export const CampaignContext = createContext();

function CampaignContextProvider(props) {
  const [campaigns, setCampaigns] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const values = {
    campaigns,
    setCampaigns,
    campaign,
    setCampaign,
  };
  return (
    <CampaignContext.Provider value={values}>
      {props.children}
    </CampaignContext.Provider>
  );
}
export default CampaignContextProvider;
