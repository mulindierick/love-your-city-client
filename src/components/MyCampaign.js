import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// import { useGlobalContext } from '../context'

const MyCampaign = () => {
    const history = useHistory()

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            history.push("/")
        }
    }, [history])

    return (
        <div>
            <h1>My Campaigns</h1>
            <button onClick={() => {
                localStorage.removeItem('accessToken')
                history.push('/')
            }}>Logout</button>
        </div>
    )
}

export default MyCampaign
