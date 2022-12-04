import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import moment from "moment";
import { CampaignContext } from "../contexts/CampaignContext";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export const Preview = () => {
  const { previewData } = useContext(CampaignContext);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const email = JSON.parse(sessionStorage.getItem("user")).email;
  const [error, setError] = useState("success");
  let [modelContent, setModelContent] = useState(
    `Your Campaign has been created`
  );

  function BasicAlerts() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack sx={{ width: "40%", alignContent: "center" }} spacing={2}>
          <Alert
            variant="filled"
            severity={error}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  if (modelContent === "Your Campaign has been created") {
                    setModalOpen(false);
                    history.push("/campaigns");
                  } else {
                    setModalOpen(false);
                    history.push("/register-campaign");
                  }
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {modelContent}
          </Alert>
        </Stack>
      </div>
    );
  }

  const goLive = () => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));

    fetch(`https://web-production-6a96.up.railway.app/campaigns`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(previewData),
    })
      .then((res) => res.json())
      .then((data) => {
        setModalOpen(true);
        localStorage.removeItem("campName");
        localStorage.removeItem("campDesc");
        localStorage.removeItem("campType");
        localStorage.removeItem("deliveryAddress");
        localStorage.removeItem("endDate");
      })
      .catch((e) => {
        console.log(e);
        setModelContent(
          "Your campaign name is already in use. Please provide a unique name."
        );
        setError("error");
        setModalOpen(true);
      });
  };

  useEffect(() => {
    if (previewData === null) history.push("/register-campaign");
  });

  return (
    <div className="preview">
      <Header />

      {previewData !== null ? (
        <div className="preview-data">
          <div className="sh-header preview-header">
            <h3> {previewData.campName}</h3>
            {modalOpen && <BasicAlerts />}
          </div>
          <div className="sc-buttons">
            <button className="cb cb-1 share-3" onClick={() => goLive()}>
              Go Live
            </button>
          </div>
          <div className="sh-details-group">
            <div className="sh-desc">
              <h3>About this campaign</h3>
              <p>{previewData.campDesc}</p>
            </div>
            <div className="sh-details">
              <h3 className="sh-desc">List of items needed</h3>
              <div className="table-group">
                <div className="row header-row">
                  <div className="col">No.</div>
                  <div className="col">Item Name</div>
                  <div className="col">Campaign Goal</div>
                  <div className="col">Donated</div>
                  <div className="col">Still Needed</div>
                </div>

                {previewData ? (
                  previewData.campaignItems.map((mapItem, index) => {
                    const { item, quantity } = mapItem;

                    return (
                      <div className="row" key={index}>
                        <div className="col">{index + 1}</div>
                        <div className="col">{item}</div>
                        <div className="col">{quantity}</div>
                        <div className="col">0</div>
                        <div className="col">{quantity}</div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>

              <div className="table-group-2">
                <div className="date">
                  <p className="header">End Date</p>
                  <p>
                    {moment(previewData.returnedEndDate).format("DD MMMM YYYY")}
                  </p>
                </div>
                <div className="address">
                  <p className="header">Delivery Address</p>
                  <p>{previewData.deliveryAddress}</p>
                </div>
                <div className="email">
                  <p className="header">Campaign Owner Email</p>
                  <p>{email}</p>
                </div>
                <div className="contact">
                  <p className="header">Contact Number</p>
                  <p>{previewData.contactNum}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

// export {Preview}
