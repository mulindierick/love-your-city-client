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

  // handle donate functionality
  let [count, setCount] = useState(0);
  function incr(e) {
    e.preventDefault();
    setCount(count + 1);
  }
  function decr(e) {
    e.preventDefault();
    setCount(count - 1);
  }

  function handleSubmit(e) {
    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));
    e.preventDefault();
    !user
      ? history.push("/log-in")
      : fetch(
          `https://love-your-city-app.herokuapp.com/campaigns/8e36e508-0f0a-4582-aba6-63373e005944`,
          {
            method: "POST",
            body: JSON.stringify([
              {
                name: "campaign 1",
                quantity: count,
              },
              {
                name: "campaign 2",
                quantity: count,
              },
            ]),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setCount(0);
          })
          .catch((e) => {
            console.log(e);
          });
  }

  let items = [
    {
      name: "cups",
      quantity: 343,
    },
    {
      name: "plates",
      quantity: 223,
    },
    {
      name: "sppons",
      quantity: 445,
    },
  ];

  return (
    <div className="sh-group">
      <div className="sh-header">
        <h1> {campaign ? campaign[0].campaign_title : ""}</h1>
        <h4>Hosted by: Erick Mulindi</h4>
      </div>
      <div className="donate-and-campaign">
        <div className="sh-details-group">
          <div className="sh-desc">
            {/* <h3>About this campaign</h3> */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              purus erat. Etiam bibendum velit elementum lorem pellentesque,
              eget elementum justo ullamcorper. Suspendisse vulputate arcu
              dolor, vitae lobortis nulla iaculis ac. Quisque eget nisi blandit,
              pulvinar augue vitae, efficitur ex. Nullam venenatis lorem sed
              lorem molestie consectetur. Duis nec lectus quis risus dapibus
              tempor non et eros. Aenean ut tincidunt ipsum, ac tempor erat.
            </p>
          </div>
          <div className="sh-details">
            <h3>Needed items</h3>
            <div className="table-group">
              <table className="sh-table">
                <tbody>
                  <tr>
                    <th>No.</th>
                    <th>Item name</th>
                    <th>Quantity</th>
                  </tr>
                  <tr>
                    <td>1.</td>
                    <td>Blankets</td>
                    <td>34</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Tin and Beans</td>
                    <td>292</td>
                  </tr>
                  <tr>
                    <td>3.</td>
                    <td>Baby beds</td>
                    <td>21</td>
                  </tr>
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
                    <td>Rondebosch, Cape Town, 7700, South Africa</td>
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
                    `https://www.loveyourcity.app/donate/${id}`
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
          {items.map((item, index) => {
            return (
              <div key={index} className="choose-donation">
                <div className="donation-name">
                  <h4>{item.name}</h4>
                  <p>
                    Goal: <span className="donation-goal">{item.quantity}</span>
                  </p>
                </div>
                <div className="your-donation">
                  <h4>Your Donation</h4>
                  <div className="your-donation-count">
                    <button className="donate-btn" onClick={decr}>
                      -
                    </button>
                    <p className="donation-count">{count}</p>
                    <button
                      className="donate-btn donate-btn-plus"
                      onClick={incr}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <button className="donate-button">Donate</button>
        </form>
      </div>
    </div>
  );
};

export default DonateToCampaign;
