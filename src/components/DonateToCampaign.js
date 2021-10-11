import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import StarIcon from "@material-ui/icons/Star";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import Header from "./Header";

const DonateToCampaign = () => {
  const { campaign, setCampaign, setPrevUrl } = useContext(CampaignContext);
  // console.log(campaign);
  let { id } = useParams();
  let history = useHistory();

  // fetch campaign information
  useEffect(() => {
    // let token = JSON.parse(sessionStorage.getItem("accessToken"));
    // let user = JSON.parse(sessionStorage.getItem("user"));
    setPrevUrl(window.location.href.length);

    fetch(` https://love-your-city-app.herokuapp.com/campaigns/${id}`, {
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
    fetch(`https://love-your-city-app.herokuapp.com/campaigns/items/${id}`, {
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
    });

    // check if donate items greate or equal to campaign items.
    // if not all donations of all items for the first time.
    // else filter out all donations with zero donared items.
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

    // console.log(donationsTotal);
    // console.log("donate items", campaignItems);

    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));
    !user
      ? history.push("/log-in")
      : campaignItems.length > 0 && donationsTotal > 0
      ? fetch(`https://love-your-city-app.herokuapp.com/campaigns/${id}`, {
          method: "POST",
          body: JSON.stringify(campaignItems),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            alert("Thank you for your donation");

            window.location.reload();
          })
          .catch((e) => {
            console.log(e);
          })
      : alert("Your donations is empty") || window.location.reload();
  }

  return (
    <React.Fragment>
      <Header />

      <div className="sh-group">
        <div className="sh-header">
          <h1> {campaign ? campaign["campaign"][0].campaign_title : ""}</h1>
          {/* <h4>Hosted by: Erick Mulindi</h4> */}
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
              <div>
                <p className="share-1">Share this Campaign:</p>
                <p className="share-2">{id}</p>
                <button
                  // className="share-3 share-4"
                  className="pill-btn blue"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://www.loveyourcity.app/donate/${id}`
                    );
                    alert("Link Copied");
                  }}
                >
                  Copy link
                </button>
              </div>
            </div>
          </div>
          <form className="donate" onSubmit={handleSubmit}>
            <h3>Support this Campaign</h3>
            {campaignItems ? (
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
              <></>
            )}
            <button className="donate-button">Donate</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DonateToCampaign;
