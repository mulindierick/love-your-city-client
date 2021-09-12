import React from 'react'
import { Link } from 'react-router-dom'

// Very much only for development
// Will definitely be changed
const TestHomePage = () => {
    return (
        <div>
            <Link to="/log-in">LogIn</Link>
            <br />
            <br />
            <Link to="/sign-up">Sign Up</Link>
        </div>
    )
}

export default TestHomePage
