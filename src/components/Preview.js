import React, { useContext, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import Header from './Header'
import moment from 'moment'
import { CampaignContext } from '../contexts/CampaignContext'

const Preview = () => {
    const { previewData } = useContext(CampaignContext)
    const history = useHistory()
    const email = JSON.parse(sessionStorage.getItem("user")).email

    const goLive = () => {
        const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));

        fetch(`https://love-your-city-app.herokuapp.com/campaigns`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(previewData),
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                alert("Campaign Created");
                history.push("/campaigns");
        });
    }

    useEffect(() => {
        if (previewData === null) history.push("/register-campaign")
    })

    return (
        <div className="preview">
            <Header />
            
            { previewData !== null ? (
                <div className="preview-data">
                    <div className="sh-header preview-header">
                        <h3> {previewData.campName}</h3>
                    </div>
                    <div className="sc-buttons">
                        <button
                            className="cb cb-1 share-3"
                            onClick={() => goLive()}
                        >
                            Go Live
                        </button>
                    </div>
                    <div className="sh-details-group">
                        <div className="sh-desc">
                            <h3>About this campaign</h3>
                            <p>{previewData.campDesc}</p>
                        </div>
                        <div className="sh-details">
                            <h2>Items Needed</h2>
                            <div className="table-group">
                                <div className="row header-row">
                                    <div className="col">No.</div>
                                    <div className="col">Item Name</div>
                                    <div className="col">Campaign Goal</div>
                                    <div className="col">Donated</div>
                                    <div className="col">Still Needed</div>
                                </div>

                                {previewData ? previewData.campaignItems.map((mapItem, index) => {
                                const { item, quantity } = mapItem;

                                return (
                                    <div className="row" key={index}>
                                    <div className="col">{index + 1}</div>
                                    <div className="col">{item}</div>
                                    <div className="col">{quantity}</div>
                                    <div className="col">0</div>
                                    <div className="col">{quantity}</div>
                                    </div>
                                );
                                }) : <></>}
                        </div>

                        <div className="table-group-2">
                            <div className="date">
                                <p className="header">End Date</p>
                                <p>{moment(previewData.returnedEndDate).format("DD MMMM YYYY")}</p>
                            </div>
                            <div className="address">
                                <p className="header">Delivery Address</p>
                                <p>{previewData.deliveryAddress}</p>
                            </div>
                            <div className="email">
                                <p className="header">Campaign Owner Email</p>
                                <p>{email}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
        </div>
    )
}

export default Preview
