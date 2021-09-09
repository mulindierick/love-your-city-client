import React from 'react'

const SignIn = () => {
    return (
        <section className="sign-in">
            <div className="container sign-in-container">
                <h1 className="sign-in-h1">Sign in</h1>
                <form action="#">
                    <input type="text" placeholder="Username" name="username" required />
                    <input type="password" placeholder="Password" name="psw" required />
                    <button type="submit" class="pill-btn blue">Sign in</button>
                </form>
            </div>
        </section>
    )
}

export default SignIn
