import React, { useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }));


const RegisterCampaign = () => {
    //Dropdown State
    const [type, campType] = React.useState('');

    const handleChange = (event) => campType(event.target.value);

    // Gift Registry State 
    const [item, setItem] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [campaignItems, setCampaignItems] = useState([])

    // Add Item to Registry
    const addRegistryItem = (e) => {
        e.preventDefault()

        if (item && quantity) setCampaignItems([...campaignItems, {item, quantity}])
        setItem('')
        setQuantity(1)
    }

    // Delete Registry Item
    const deleteRegistryItem = (e) => {
        e.preventDefault()

        const id = e.target.id
        setCampaignItems([...campaignItems.filter((item, index) => index !== parseInt(id)) ])
    }

    return (
        <section className="create-campaign-section"> 
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
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="name">Campaign Description</label>
                        <textarea
                            className="campaign-input"
                            name="description"
                            type="text"
                            rows="3"
                            maxLength="300"
                        />
                    </div>
                    <div>
                    {/* <FormControl className={classes.formControl}> */}
                    <InputLabel shrink htmlFor="age-native-label-placeholder">
                      Campaign Type
                    </InputLabel>
                        <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        value={type}
                        onChange={handleChange}
                        displayEmpty
                        // className={classes.selectEmpty}
                        >
                            <MenuItem value="">
                                <label>--Select Campaign Type--</label>
                            </MenuItem>
                            <MenuItem value="Type 1">Campaign Type 1</MenuItem>
                            <MenuItem value="Type 2">Campaign Type 2</MenuItem>
                            <MenuItem value="Type 3">Campaign Type 3</MenuItem>
                        </Select>
                    {/* </FormControl> */}
                    </div>
                    <div className="input-div">
                        <label htmlFor="start-date">Start Date</label>
                        <input
                            className="campaign-input"
                            name="start-date"
                            type="text"
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="end-date">End Date</label>
                        <input
                            className="campaign-input"
                            name="end-date"
                            type="text"
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="end-date">Delivery address for donations</label>
                        <input
                            className="campaign-input"
                            name="end-date"
                            type="text"
                        />
                    </div>

                    {/* Registry */}
                    <div className="registry-div">
                        <h6>Add Items you wish to be Donated</h6>
                        <div className="registry-input-div">
                            <div style={{ display: 'inline-block', width: '43%'}}>
                                <input
                                    className="registry-input"
                                    name="item-add"
                                    type="text"
                                    placeholder="Enter Item Name"
                                    value={item}
                                    onChange={(e) => setItem(e.target.value)}
                                />
                            </div>
                            <div style={{ display: 'inline-block', width: '25%', margin: '0 5px'}}>
                                <input
                                    className="registry-input"
                                    name="item-count"
                                    type="number"
                                    min="0"
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <button className="btn-add-item" onClick={(e) => addRegistryItem(e)}>Add</button>
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
                            {
                                !campaignItems ? <></> :
                                    campaignItems.map((campaignItem, index) => {
                                        const { item, quantity } = campaignItem

                                        return (
                                            <div className="row" key={index}>
                                                <div className="col-name">{item}</div>
                                                <div className="col-quan">{quantity}</div>
                                                <div className="col-delete">
                                                    <button
                                                        className="delete-item"
                                                        id={index}
                                                        onClick={(e) => deleteRegistryItem(e)}
                                                    >Delete</button>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>

                    <div>
                        <button type="submit" form="create-campaign-form" className="pill-btn blue" onClick={(e) => {e.preventDefault()}}>
                            Go Live
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default RegisterCampaign
