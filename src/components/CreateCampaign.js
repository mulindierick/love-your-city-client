import React from 'react'

const CreateCampaign = () => {
    return (
        <section className="create-campaign-section"> 
            <div className="create-campaign-header">
                <h1>Create A Campaign</h1>
                <p>Create a campaign to help others in need of essential items</p>
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
                </form>
            </div>
        </section>
    )
}

export default CreateCampaign
