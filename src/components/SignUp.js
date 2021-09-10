import React from 'react'

const SignUp = () => {
    return (
        <section className="sign-up">
            <div className="container sign-up-container">
                <h1 className="sign-up-h1">Sign in</h1>
                <form action="#">
                    <input type="text" placeholder="Username" name="username" required />
                    <input type="password" placeholder="Password" name="psw" required />
                    <button type="submit" class="pill-btn blue">Sign in</button>
                </form>
            </div>
        </section>
    )
}

export default SignUp