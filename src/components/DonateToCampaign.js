import React, { useEffect } from "react";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const DonateToCampaign = () => {
  const { campaign, setCampaign, setPrevUrl } = useContext(CampaignContext);
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));
    setPrevUrl(window.location.href.length)

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
  }, [history, setCampaign, id]);

  return (
    <div className="sh-group">
      <div className="sh-header">
        <h1> {campaign ? campaign[0].campaign_title : ""}</h1>
        <h4>Hosted by: Erick Mulindi</h4>
      </div>
      <div className="sh-details-group">
        <div className="sh-desc">
          <h3>About this campaign</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et purus
            erat. Etiam bibendum velit elementum lorem pellentesque, eget
            elementum justo ullamcorper. Suspendisse vulputate arcu dolor, vitae
            lobortis nulla iaculis ac. Quisque eget nisi blandit, pulvinar augue
            vitae, efficitur ex. Nullam venenatis lorem sed lorem molestie
            consectetur. Duis nec lectus quis risus dapibus tempor non et eros.
            Aenean ut tincidunt ipsum, ac tempor erat.
          </p>
        </div>
        <div className="sh-details">
          <h2>Needed items</h2>
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
          <button>Support this Campaign</button>
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
    </div>
  );
};

export default DonateToCampaign;
