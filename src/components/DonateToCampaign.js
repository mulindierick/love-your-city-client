import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const DonateToCampaign = () => {
  const { campaign, setCampaign, setPrevUrl } = useContext(CampaignContext);
  let { id } = useParams();
  let history = useHistory();
  
  // fetch campaign imformation
  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));
    setPrevUrl(window.location.href.length);

    !user
      ? history.push("/log-in")
      : fetch(`https://love-your-city-app.herokuapp.com/campaigns/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setCampaign(res);
          })
          .catch((error) => {
            history.push("/campaigns");
            console.log(error);
          });
  }, [history, setCampaign, id, setPrevUrl]);

  // fetch campaing items only
  let [campaignItems, setCampaignItems] = useState([]);

  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));

    !user
      ? history.push("/log-in")
      : fetch(
          `https://love-your-city-app.herokuapp.com/campaigns/items/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
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
    console.log("incr", e.currentTarget.dataset.item);
    let itemName = e.currentTarget.dataset.item;
    let tempItems = campaignItems.map((item, index) => {
      if (campaign) {
        if (
          item.campaign_item_name === itemName &&
          item.campaign_item_quantity !==
            Number(campaign["donations"][index].total) &&
          item.campaign_item_quantity !== item.donation &&
          item.campaign_item_quantity -
            Number(campaign["donations"][index].total) !==
            item.donation
        ) {
          console.log(
            item.campaign_item_quantity,
            Number(campaign["donations"][index].total)
          );
          item.donation++;
          return item;
        } else {
          return item;
        }
      }
      return true;
    });
    setCampaignItems(tempItems);
    console.log(tempItems[0].quantity);
  }
  // handle donation decrease
  function decr(e) {
    e.preventDefault();
    console.log("decr", e.currentTarget.dataset.item);
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
    console.log(tempItems[0].quantity);
  }
  // handle submit form for making a donation
  function handleSubmit(e) {
    e.preventDefault();
    campaignItems.forEach((item) => {
      delete item.campaign_item_quantity;
    });
    campaignItems = campaignItems.filter((item) => {
      return item.donation > 0;
    });
    console.log("donate items", campaignItems);

    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));
    !user
      ? history.push("/log-in")
      : fetch(`https://love-your-city-app.herokuapp.com/campaigns/${id}`, {
          method: "POST",
          body: JSON.stringify(campaignItems),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            alert("Thank you for your donation");
            window.location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
  }

  return (
    <div className="sh-group">
      <div className="sh-header">
        <h1> {campaign ? campaign["campaign"][0].campaign_title : ""}</h1>
        <h4>Hosted by: Erick Mulindi</h4>
      </div>
      <div className="donate-and-campaign">
        <div className="sh-details-group">
          <div className="sh-desc">
            <p>{campaign ? campaign["campaign"][0].campaign_desc : ""}</p>
          </div>
          <div className="sh-details">
            <h3>Needed items</h3>
            <div className="table-group">
              <table className="sh-table">
                <tbody>
                  <tr>
                    <th>No.</th>
                    <th>Item Name</th>
                    <th>Campaign Goal</th>
                    <th>Donated</th>
                    <th>Still needed</th>
                  </tr>
                  {campaign ? (
                    campaign["campaign"].map((item, index) => {
                      console.log(item);
                      return (
                        <tr key={index}>
                          <td>{index + 1}.</td>
                          <td>{item.campaign_item_name}</td>
                          <td>{item.campaign_item_quantity}</td>
                          <td>{campaign["donations"][index].total}</td>
                          <td>
                            {item.campaign_item_quantity -
                              campaign["donations"][index].total}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-group-2">
              <table className="sh-table-2">
                <tbody>
                  <tr>
                    <th>Delivery Date </th>
                    <th>Delivery Address</th>
                  </tr>
                  <tr>
                    <td> 12/03/2023</td>
                    <td>
                      {campaign ? campaign["campaign"][0].delivery_address : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <p className="share-1">Share this Campaign:</p>
              <p className="share-2">{id}</p>
              <p
                className="share-3 share-4"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://love-your-city-app.herokuapp.com/campaigns/donate/${id}`
                  );
                  alert("Link Copied");
                }}
              >
                Copy link
              </p>
            </div>
          </div>
        </div>
        <form className="donate" onSubmit={handleSubmit}>
          <h3>Support this Campaign</h3>
          {campaignItems ? (
            campaignItems.map((item, index) => {
              return (
                <div key={index} className="choose-donation">
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
                        {campaign
                          ? campaign["campaign"][index].campaign_item_quantity -
                            campaign["donations"][index].total
                          : ""}
                      </span>
                    </p>
                  </div>
                  <div className="your-donation">
                    <h4>Your Donation</h4>
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
  );
};

export default DonateToCampaign;
