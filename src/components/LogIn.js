import React from 'react'

const LogIn = () => {
    return (
        <section className="log-in">
            <div className="container log-in-container">
                <h1 className="log-in-h1">Log in</h1>
                <form action="#">
                    <input type="text" placeholder="Username" name="username" required />
                    <input type="password" placeholder="Password" name="psw" required />
                    <button type="submit" className="pill-btn blue">Log in</button>
                </form>
            </div>
        </section>
    )
}

export default LogIn
