import React, { useEffect } from "react";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import { useHistory } from "react-router-dom";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import LinkedInIcon from "@material-ui/icons/LinkedIn";
// import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const ShowCampaign = () => {
  const { campaign, setCampaign } = useContext(CampaignContext);
  let cId = JSON.parse(sessionStorage.getItem("cId"));
  let history = useHistory();

  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));

    !user
      ? history.push("/")
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
            Aenean ut tincidunt ipsum, ac tempor erat. Pellentesque porttitor
            lectus semper justo convallis ullamcorper. Aenean eros sem, euismod
            non efficitur ut, ornare tincidunt metus. Etiam cursus placerat
            erat, a tempus neque pellentesque non. Sed convallis justo non urna
            volutpat, a maximus magna auctor. Fusce vestibulum aliquet mauris
            non auctor. In dapibus lectus a sagittis facilisis. Proin finibus et
            arcu nec elementum. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Nam sed lacus malesuada,
            maximus mauris nec, egestas tellus.
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
          {/* <button>Support this Campaign</button> */}
          <div>
            <a href={`donate/${cId}`} className="share-2">
            Preview Campaign
            </a>
            <p
              className="share-3"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://www.loveyourcity.app/donate/${cId}`
                );
                alert("Link Copied");
              }}
            >
              Copy link
            </p>
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
