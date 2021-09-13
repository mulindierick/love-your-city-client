import React from "react";
const ShowCampaign = () => {
  return (
    <div className="sh-group">
      <div className="sh-header">
        <h1>Save Cape Town</h1>
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
            </table>
          </div>
          <div className="table-group-2">
            <table className="sh-table-2">
              <tr>
                <th>Delivery Date </th>
                <th>Delivery Address</th>
              </tr>
              <tr>
                <td> 12/03/2023</td>
                <td>Rondebosch, Cape Town, 7700, South Africa</td>
              </tr>
            </table>
          </div>
          <button>Support this Campaign</button>
          <div>
            <p className="share-1">Share this Campaign</p>
            <p className="share-2">
              https://love-your-city-app.herokuapp.com/campaigns/0bf4ff72-00b5-4245-afde-8fb107110053
            </p>
            <p className="share-3">Copy link</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCampaign;
