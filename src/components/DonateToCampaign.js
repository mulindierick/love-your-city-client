import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import StarIcon from "@material-ui/icons/Star";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import Header from "./Header";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const DonateToCampaign = () => {
  const [showDonateBtn, setShowDonateBtn] = useState(true);
  const { campaign, setCampaign, setPrevUrl } = useContext(CampaignContext);
  let { id } = useParams();
  let history = useHistory();

  let [firstName, setFirstName] = useState("");
  let [secondName, setSecondName] = useState("");
  let [email, setEmail] = useState("");

  let [modelContent, setModelContent] = useState(`Link Copied`);
  let [error, setError] = useState("success");

  const [modalOpen, setModalOpen] = useState(false);

  const errorDonating = () => {
    setError("error");
    setModelContent(`Your Donation is empty`);
    setModalOpen(true);
  };

  function BasicAlerts() {
    return (
      <div className="modal-bg">
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
                    if (modelContent === "Link Copied") {
                      setModalOpen(false);
                    } else if (modelContent === "Your Donation is empty") {
                      window.location.reload();
                    } else {
                      window.location.reload();
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
      </div>
    );
  }

  // fetch campaign information
  useEffect(() => {
    setPrevUrl(window.location.href.length);

    fetch(` https://render-lyc-app.onrender.com/campaigns/${id}`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCampaign(res);
        // console.log(campaign);
      })
      .catch((error) => {
        history.go(-2);
        // console.log(error);
      });
  }, [history, setCampaign, id, setPrevUrl]);

  // fetch campaign items only
  let [campaignItems, setCampaignItems] = useState([]);

  useEffect(() => {
    // let token = JSON.parse(sessionStorage.getItem("accessToken"));
    // let user = JSON.parse(sessionStorage.getItem("user"));
    fetch(`https://render-lyc-app.onrender.com/campaigns/items/${id}`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("erick", res);
        res.forEach((item) => {
          item["donation"] = 0;
        });
        setCampaignItems(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [history, id]);

  // handle donation increase
  function incr(e) {
    setShowDonateBtn(false);
    e.preventDefault();
    // console.log("incr", e.currentTarget.dataset.item);
    let itemName = e.currentTarget.dataset.item;
    let tempItems = campaignItems.map((item, index) => {
      if (campaign && campaign["donations"].length > 0) {
        if (
          item.campaign_item_name === itemName &&
          item.campaign_item_quantity !==
            Number(campaign["donations"][index].total) &&
          item.campaign_item_quantity !== item.donation &&
          item.campaign_item_quantity -
            Number(campaign["donations"][index].total) !==
            item.donation
        ) {
          item.donation++;
          return item;
        } else {
          return item;
        }
      } else {
        if (
          item.campaign_item_name === itemName &&
          item.campaign_item_quantity !== item.donation
        ) {
          item.donation++;
          return item;
        } else {
          return item;
        }
      }
    });
    setCampaignItems(tempItems);
    // console.log(tempItems[0].quantity);
  }
  // handle donation decrease
  function decr(e) {
    e.preventDefault();
    // console.log("decr", e.currentTarget.dataset.item);
    let itemName = e.currentTarget.dataset.item;
    let tempItems = campaignItems.map((item) => {
      if (item.campaign_item_name === itemName && item.donation > 0) {
        // item.campaign_item_quantity--;
        item.donation--;
        return item;
      } else {
        return item;
      }
    });
    setCampaignItems(tempItems);
    // console.log(tempItems[0].quantity);
  }
  // handle submit form for making a donation
  function handleSubmit(e) {
    setPrevUrl(window.location.href.length);
    // console.log(window.location.href.length);
    e.preventDefault();
    campaignItems.forEach((item) => {
      delete item.campaign_item_quantity;
      item["firstName"] = firstName;
      item["secondName"] = secondName;
      item["email"] = email;
    });

    if (campaign["donations"].length >= campaign["campaign"].length) {
      campaignItems = campaignItems.filter((item) => {
        return item.donation > 0;
      });
    }

    let donationsTotal = 0;
    if (campaignItems.length > 0) {
      donationsTotal = campaignItems.map((item) => {
        return item.donation;
      });
      // console.log(donationsTotal);
      donationsTotal = donationsTotal.reduce((prev, curr) => prev + curr);
    }

    campaignItems.length > 0 && donationsTotal > 0
      ? fetch(`https://render-lyc-app.onrender.com/campaigns/${id}`, {
          method: "POST",
          body: JSON.stringify(campaignItems),
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setModelContent(`Thank you for your donation`);
            setModalOpen(true);
          })
          .catch((e) => {
            console.log(e);
          })
      : errorDonating();
  }

  return (
    <React.Fragment>
      <Header />

      <div className="sh-group">
        <div className="sh-header">
          <h1> {campaign ? campaign["campaign"][0].campaign_title : ""}</h1>
          {modalOpen && <BasicAlerts />}
        </div>
        <div className="donate-and-campaign">
          <div className="sh-details-group">
            <div className="sh-desc">
              <p>{campaign ? campaign["campaign"][0].campaign_desc : ""}</p>
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

                {campaign && campaign["donations"].length > 0 ? (
                  campaign["campaign"].map((item, index) => {
                    // console.log(item);
                    return (
                      <div className="row" key={index}>
                        <div className="col">{index + 1}.</div>
                        <div className="col">{item.campaign_item_name}</div>
                        <div className="col">{item.campaign_item_quantity}</div>
                        <div className="col">
                          {campaign["donations"][index].total
                            ? campaign["donations"][index].total
                            : 0}
                        </div>
                        <div className="col">
                          {item.campaign_item_quantity -
                            (campaign["donations"][index].total
                              ? campaign["donations"][index].total
                              : 0)}
                        </div>
                      </div>
                    );
                  })
                ) : campaign ? (
                  campaign["campaign"].map((item, index) => {
                    // console.log(item);
                    return (
                      <div className="row" key={index}>
                        <div className="col">{index + 1}.</div>
                        <div className="col">{item.campaign_item_name}</div>
                        <div className="col">{item.campaign_item_quantity}</div>
                        <div className="col">0</div>
                        <div className="col">{item.campaign_item_quantity}</div>
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
                    {campaign
                      ? moment(campaign["campaign"][0].end_date).format(
                          "DD MMMM YYYY"
                        )
                      : ""}
                  </p>
                </div>
                <div className="address">
                  <p className="header">Delivery Address</p>
                  <p>
                    {campaign ? campaign["campaign"][0].delivery_address : ""}
                  </p>
                </div>
                <div className="email">
                  <p className="header">Campaign Owner Email</p>
                  <p>{campaign ? campaign["user"][0].email : ""}</p>
                </div>
              </div>
            </div>
          </div>

          <form className="donate" onSubmit={handleSubmit}>
            <h3>Support this Campaign</h3>

            {campaignItems.length !== 0 ? (
              campaignItems.map((item, index) => {
                return (
                  <div key={index} className="choose-donation">
                    {campaign && campaign["donations"].length > 0 ? (
                      Number(campaign["donations"][index].total) ===
                      Number(
                        campaign["campaign"][index].campaign_item_quantity
                      ) ? (
                        <StarIcon style={{ fontSize: 40, color: "gold" }} />
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}

                    <div className="donation-name">
                      <h4>{item.campaign_item_name}</h4>
                      <p>
                        Goal:{" "}
                        <span className="donation-goal">
                          {item.campaign_item_quantity}
                        </span>
                      </p>
                      <p>
                        Still Needed:{" "}
                        <span className="donation-goal">
                          {campaign && campaign["donations"].length > 0 ? (
                            campaign["campaign"][index].campaign_item_quantity -
                            (campaign["donations"][index].total
                              ? campaign["donations"][index].total
                              : 0)
                          ) : campaign ? (
                            campaign["campaign"][index].campaign_item_quantity
                          ) : (
                            <></>
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="your-donation">
                      {campaign && campaign["donations"].length > 0 ? (
                        Number(campaign["donations"][index].total) ===
                        Number(
                          campaign["campaign"][index].campaign_item_quantity
                        ) ? (
                          <h4>Goal Reached</h4>
                        ) : (
                          <h4>Your Donation</h4>
                        )
                      ) : (
                        <h4>Your Donation</h4>
                      )}

                      <div className="your-donation-count">
                        <button
                          className="donate-btn"
                          onClick={(e) => decr(e)}
                          data-item={item.campaign_item_name}
                        >
                          -
                        </button>
                        <p className="donation-count">{item.donation}</p>
                        <button
                          className="donate-btn donate-btn-plus"
                          onClick={(e) => incr(e)}
                          data-item={item.campaign_item_name}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <Stack sx={{ width: "100%", color: "grey.100" }} spacing={0}>
                  <LinearProgress color="inherit" />
                  <LinearProgress color="inherit" />
                  <LinearProgress color="inherit" />
                  <LinearProgress color="inherit" />
                  <LinearProgress color="inherit" />
                  <LinearProgress color="inherit" />
                </Stack>
              </>
            )}

            {/* protected */}

            <div className="choose-donation">
              <input
                style={{ textAlign: "center" }}
                type="text"
                placeholder="Name"
                name="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                style={{ textAlign: "center" }}
                type="text"
                placeholder="Surname"
                name="secondname"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                required
              />
              <input
                style={{ textAlign: "center" }}
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* protected */}

            <button className="donate-button" style={{ cursor: "pointer" }}>
              Donate
            </button>
            <div
              style={{
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p className="share-1">Share this Campaign:</p>
              {/* <p className="share-2">{id}</p> */}
              <div
                // className="share-3 share-4"
                className="donate-button"
                style={{ backgroundColor: "#213368", width: "fit-content" }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://www.loveyourcity.app/donate/${id}`
                  );
                  setModalOpen(true);
                }}
              >
                Copy Link
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DonateToCampaign;
