import React, { useEffect } from "react";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import { useHistory } from "react-router-dom";
import LoopRoundedIcon from "@material-ui/icons/LoopRounded";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import LinkedInIcon from "@material-ui/icons/LinkedIn";
// import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const ShowCampaign = () => {
  const { campaign, setCampaign } = useContext(CampaignContext);
  let cId = JSON.parse(sessionStorage.getItem("cId"));
  let history = useHistory();

  // delete campaign by id

  function deleteCampaign(e) {
    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));
    e.preventDefault();
    !user
      ? history.push("/log-in")
      : fetch(`https://love-your-city-app.herokuapp.com/campaigns/${cId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            alert("campaign deleted");
            history.push("/campaigns");
          })
          .catch((e) => {
            console.log(e);
          });
  }

  // get campaign by id
  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));

    !user
      ? history.push("/log-in")
      : fetch(`https://love-your-city-app.herokuapp.com/campaigns/${cId}`, {
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
  }, [history, setCampaign, cId]);

  return (
    <div className="sh-group">
      <div className="sh-header">
        <h3> {campaign ? campaign[0].campaign_title : <LoopRoundedIcon />}</h3>
        {/* <h4>Hosted by: Erick Mulindi</h4> */}
      </div>
      <div className="sc-buttons">
        <button
          className="cb cb-1 share-3"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://www.loveyourcity.app/donate/${cId}`
            );
            alert("Link Copied");
          }}
        >
          Copy Sharable link
        </button>
        <a href={`donate/${cId}`} className="cb cb-2">
          Preview Campaign
        </a>
        <button className="cb cb-2">Edit</button>
        <button className="cb cb-2 share-3" onClick={deleteCampaign}>
          Delete
        </button>
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
          {/* <p className="share-1">Social Share:</p>
          <div className="social-share">
            <FacebookIcon style={{ fontSize: 40 }} />
            <TwitterIcon style={{ fontSize: 40 }} />
            <LinkedInIcon style={{ fontSize: 40 }} />
            <WhatsAppIcon style={{ fontSize: 40 }} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ShowCampaign;
