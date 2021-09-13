import React from 'react'
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
        // const classes = useStyles();
        const [type, campType] = React.useState('');

        const handleChange = (event) => {
        campType(event.target.value);
      };
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
                    <div>
                        <button type="submit" className="pill-btn blue">
                        Go Live
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default RegisterCampaign
