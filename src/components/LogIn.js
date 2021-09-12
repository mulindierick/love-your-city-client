import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalContext } from '../context'

const LogIn = () => {
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isValidForm, displayFormNotValid } = useGlobalContext()
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return displayFormNotValid()
        }

        console.log("Sending data to server");

        const res = await fetch("https://love-your-city-app.herokuapp.com/login", {
          method: "POST",
          body: JSON.stringify({
            password: password,
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        try {
            console.log(res.status)
            const data = await res.json()

            if (res.status === 200) {
                localStorage.setItem('accessToken', data.accessToken)
                console.log(localStorage)
                setEmail("");
                setPassword("");
                history.push("/my-campaign")
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <section className="log-in">
            <div className="container log-in-container">
                <h1 className="log-in-h1">Log in</h1>
                { !isValidForm && <p className="valid-details">Please provide valid details </p> }
                <form action="#">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="psw"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="pill-btn blue" onClick={(e) => handleSubmit(e)}>Log in</button>
                </form>
            </div>
        </section>
    )
}

export default LogIn
