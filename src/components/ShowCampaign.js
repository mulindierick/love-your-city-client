import React, { useEffect } from "react";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import { useHistory, useParams } from "react-router-dom";
import LoopRoundedIcon from "@material-ui/icons/LoopRounded";
import moment from "moment";
import Header from "./Header";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import LinkedInIcon from "@material-ui/icons/LinkedIn";
// import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const ShowCampaign = () => {
  let history = useHistory();
  let { id: cId } = useParams();
  const { campaign, setCampaign } = useContext(CampaignContext);
  // console.log(campaign);
  // console.log(cId);

  let itemInfo = "";
  if (!campaign) {
    history.push("/campaigns");
  } else {
    itemInfo = campaign.campaignItems.map((item, index) => {
      let donations =
        campaign.donationItems
          .filter((el) => el.item_name === item.campaign_item_name)
          .reduce((acc, cur) => acc + cur.item_quantity, 0) || 0;

      return {
        name: item.campaign_item_name,
        goal: item.campaign_item_quantity,
        donated: donations,
        needed: item.campaign_item_quantity - donations,
      };
    });
  }

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
            // console.log(data)
            alert("campaign deleted");
            history.push("/campaigns");
          })
          .catch((e) => {
            console.log(e);
          });
  }

  // get campaign by id
  useEffect(() => {
    // let token = JSON.parse(sessionStorage.getItem("accessToken"));
    let user = JSON.parse(sessionStorage.getItem("user"));

    !user && history.push("/log-in");
    // : fetch(`http://localhost:5000/campaigns/${cId}`, {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       console.log(res)
    //       setCampaign(res);
    //     })
    //     .catch((error) => {
    //       history.push("/campaigns");
    //       console.log(error);
    //     });
  }, [history, setCampaign, cId]);

  return (
    <React.Fragment>
       <Header />
    <div className="sh-group">
     
      {campaign ? (
        <>
          <div className="sh-header">
            <h3> {campaign.campaign_title}</h3>
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
            {/* <a href={`donate/${cId}`} className="cb cb-2">
          Preview Campaign
        </a> */}
            <button className="cb cb-2 share-3" onClick={deleteCampaign}>
              Delete
            </button>
            <button className="cb cb-2 disabled">Edit</button>
          </div>
          <div className="sh-details-group">
            <div className="sh-desc">
              <h3>About this campaign</h3>
              <p>{campaign.campaign_desc}</p>
            </div>
            <div className="sh-details">
              <h2>Items Needed</h2>
              <div className="table-group">
                {/* <table className="sh-table">
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
                  <td>{moment(campaign.end_date).format("DD/MM/YYYY")}</td>
                  <td>{campaign.delivery_address}</td>
                </tr>
              </tbody>
            </table> */}

                <div className="row header-row">
                  <div className="col">No.</div>
                  <div className="col">Item Name</div>
                  <div className="col">Campaign Goal</div>
                  <div className="col">Donated</div>
                  <div className="col">Still Needed</div>
                </div>

                {itemInfo.map((mapItem, index) => {
                  const { name, goal, donated, needed } = mapItem;

                  return (
                    <div className="row" key={index}>
                      <div className="col">{index + 1}</div>
                      <div className="col">{name}</div>
                      <div className="col">{goal}</div>
                      <div className="col">{donated}</div>
                      <div className="col">{needed}</div>
                    </div>
                  );
                })}
              </div>
              {/* <p className="share-1">Social Share:</p>
          <div className="social-share">
            <FacebookIcon style={{ fontSize: 40 }} />
            <TwitterIcon style={{ fontSize: 40 }} />
            <LinkedInIcon style={{ fontSize: 40 }} />
            <WhatsAppIcon style={{ fontSize: 40 }} />
          </div> */}

              <div className="table-group-2">
                <div className="date">
                  <p className="header">End Date</p>
                  <p>{moment(campaign.end_date).format("DD MMMM YYYY")}</p>
                </div>
                <div className="address">
                  <p className="header">Delivery Address</p>
                  <p>{campaign.delivery_address}</p>
                </div>
                <div className="email">
                  <p className="header">Campaign Owner Email</p>
                  <p>{campaign.email}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoopRoundedIcon />
      )}
    </div>
    </React.Fragment>
  );
};

export default ShowCampaign;
