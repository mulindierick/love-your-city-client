/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router";
import { CampaignContext } from "../contexts/CampaignContext";
import Header from "./Header";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(() => ({
  formControl: {
    borderRadius: "4%",
    minWidth: "100%",
    fontSize: 10,
  },
  selectEmpty: {
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    padding: 16,
  },
  selectItem: {
    backgroundColor: "transparent",
    // color: 'red'
  },
}));

// campName,
//       campDesc,
//       campType,
//       returnedEndDate,
//       deliveryAddress,
//       campaignItems,

// const storedName = sessionStorage.getItem("campName") || ''
// const storedDesc = sessionStorage.getItem("campDesc") || ''
// const storedType = sessionStorage.getItem("campType") || "General Support"
// const storedAddress = sessionStorage.getItem("campAddress") || ''
// const storedEndDate = sessionStorage.getItem("endDate") || ''
// const storedItems = sessionStorage.getItem("campItems") || []

const RegisterCampaign = () => {
  const { setPreviewData } = useContext(CampaignContext);
  const classes = useStyles();
  const history = useHistory();

  const storedName = sessionStorage.getItem("campName") || "";
  const storedDesc = sessionStorage.getItem("campDesc") || "";
  const storedType = sessionStorage.getItem("campType") || "General Support";
  const storedAddress = sessionStorage.getItem("deliveryAddress") || "";
  const storedEndDate = sessionStorage.getItem("endDate") || "";
  // const storedItems = JSON.parse(sessionStorage.getItem("campaignItems")) || []

  // Form Item State
  const today = new Date();
  const [campName, setCampName] = useState(storedName);
  const [campDesc, setCampDesc] = useState(storedDesc);
  const [campType, setCampType] = useState(storedType);
  const [endDate, setEndDate] = useState(storedEndDate);
  const [returnedEndDate, setReturnedEndDate] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(storedAddress);

  // Registry State
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [campaignItems, setCampaignItems] = useState([]);

  // Validation State
  const [isValid, setIsValid] = useState(false);

  // Add Item to Registry
  const addRegistryItem = (e) => {
    e.preventDefault();

    if (campaignItems.map(el => el.item).includes(item)) {
      setItem("");
      setQuantity(1);
      return
    }

    if (item && quantity) setCampaignItems([...campaignItems, { item, quantity }]);


    setItem("");
    setQuantity(1);
  };

  // Delete Registry Item
  const deleteRegistryItem = (e) => {
    e.preventDefault();

    const id = e.target.id;
    setCampaignItems([
      ...campaignItems.filter((item, index) => index !== parseInt(id)),
    ]);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = JSON.parse(sessionStorage.getItem("user"))["user_id"];
    // const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));

    let campaignData = {
      userId,
      campName,
      campDesc,
      campType,
      returnedEndDate,
      deliveryAddress,
      campaignItems,
    };

    // console.log(campaignData);
    setPreviewData(campaignData);

    sessionStorage.setItem("campName", campName);
    sessionStorage.setItem("campDesc", campDesc);
    sessionStorage.setItem("campType", campType);
    sessionStorage.setItem("deliveryAddress", deliveryAddress);
    sessionStorage.setItem("endDate", returnedEndDate);
    // console.log(JSON.stringify([...campaignItems]))
    // sessionStorage.setItem("campaignItems", JSON.stringify([...campaignItems]))

    history.push("/preview");
  };

  // Use effect to validate that all the data has been inputed correctly on the front end
  useEffect(() => {
    if (
      campName &&
      campDesc &&
      endDate &&
      deliveryAddress &&
      campaignItems.length > 0 &&
      returnedEndDate !== null
    )
      setIsValid(true);
    else setIsValid(false);
  }, [
    campName,
    campDesc,
    endDate,
    deliveryAddress,
    campaignItems,
    returnedEndDate,
  ]);

  // Validation for returning date string in correct format
  useEffect(() => {
    if (endDate.length === 10)
      setReturnedEndDate(moment(endDate).format("YYYY-MM-DD"));
    else setReturnedEndDate(null);
  }, [endDate]);

  return (
    <section className="create-campaign-section">
      <Header />
      <div className="create-campaign-header">
        <h1>Register A Campaign</h1>
        <p>Register a campaign to help others in need of essential items</p>
      </div>
      <div className="container">
        <form id="create-campaign-form">
          <div className="input-div">
            <label htmlFor="name">Campaign Name</label>
            <input
              className="campaign-input"
              name="name"
              type="text"
              value={campName}
              onChange={(e) => setCampName(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label htmlFor="description">Campaign Description</label>
            <textarea
              className="campaign-input"
              name="description"
              type="text"
              rows="3"
              maxLength="300"
              value={campDesc}
              onChange={(e) => setCampDesc(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="demo-simple-select-placeholder-label">
              Campaign Type
            </label>
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={campType}
                onChange={(e) => setCampType(e.target.value)}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem
                  value="General Support"
                  className={classes.selectItem}
                >
                  General Support
                </MenuItem>
                <MenuItem
                  value="Disaster Relief"
                  className={classes.selectItem}
                >
                  Disaster Relief
                </MenuItem>
                <MenuItem
                  value="Educational Resources"
                  className={classes.selectItem}
                >
                  Educational Resources
                </MenuItem>
                <MenuItem
                  value="Helping the Homeless"
                  className={classes.selectItem}
                >
                  Helping the Homeless
                </MenuItem>
                <MenuItem
                  value="Hunger and Malnutrition"
                  className={classes.selectItem}
                >
                  Hunger and Malnutrition
                </MenuItem>
                <MenuItem value="Animal Welfare" className={classes.selectItem}>
                  Animal Welfare
                </MenuItem>
                <MenuItem value="Child Welfare" className={classes.selectItem}>
                  Child Welfare
                </MenuItem>
                <MenuItem value="Elder Care" className={classes.selectItem}>
                  Elder Care
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="input-div">
            <label htmlFor="end-date">End Date</label>
            <input
              className="campaign-input"
              name="end-date"
              type="date"
              value={endDate}
              onChange={(e) => {
                if (moment(e.target.value).toDate() > today)
                  setEndDate(e.target.value);
              }}
            />
          </div>
          <div className="input-div">
            <label htmlFor="end-date">Delivery address for donations</label>
            <input
              className="campaign-input"
              name="end-date"
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </div>

          {/* Registry */}
          <div className="registry-div">
            <h6>Add Items you wish to be Donated</h6>
            <div className="registry-input-div">
              <div style={{ display: "inline-block", width: "43%" }}>
                <input
                  className="registry-input"
                  name="item-add"
                  type="text"
                  placeholder="Enter Item Name"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "25%",
                  margin: "0 5px",
                }}
              >
                <input
                  className="registry-input"
                  name="item-count"
                  type="number"
                  min="0"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <button
                className="btn-add-item"
                onClick={(e) => addRegistryItem(e)}
              >
                Add
              </button>
            </div>

            <div className="registry-display">
              <div className="row header-row">
                <div className="col-name">Item Name</div>
                <div className="col-quan">Quantity</div>
                <div className="col-delete"></div>
              </div>
              {/* <div className="row">
                                <div className="col-name">Chicken</div>
                                <div className="col-quan">12</div>
                                <div className="col-delete">
                                    <button className="delete-item">Delete</button>
                                </div>
                            </div> */}
              {!campaignItems ? (
                <></>
              ) : (
                campaignItems.map((campaignItem, index) => {
                  const { item, quantity } = campaignItem;

                  return (
                    <div className="row" key={index}>
                      <div className="col-name">{item}</div>
                      <div className="col-quan">{quantity}</div>
                      <div className="col-delete">
                        <button
                          className="delete-item"
                          id={index}
                          onClick={(e) => deleteRegistryItem(e)}
                        >
                          <ClearIcon/> Remove
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div>
            {isValid ? (
              <button
                type="submit"
                form="create-campaign-form"
                className="pill-btn blue"
                onClick={(e) => handleSubmit(e)}
              >
                Preview Campaign
              </button>
            ) : (
              <button disabled className="pill-btn disabled">
                Please Complete Form
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterCampaign;
