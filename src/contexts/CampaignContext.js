import React, { createContext, useState } from "react";
export const CampaignContext = createContext();

function CampaignContextProvider(props) {
  const [campaigns, setCampaigns] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [prevUrl, setPrevUrl] = useState(0);
  const values = {
    campaigns,
    setCampaigns,
    campaign,
    setCampaign,
    prevUrl,
    setPrevUrl,
    previewData,
    setPreviewData,
  };
  return (
    <CampaignContext.Provider value={values}>
      {props.children}
    </CampaignContext.Provider>
  );
}
export default CampaignContextProvider;
