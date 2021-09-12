import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from '../context'

const SignUp = () => {
  const history = useHistory()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isValidForm, displayFormNotValid } = useGlobalContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data to server");

    if (!email || !password || !username) {
      return displayFormNotValid()
    }

    const res = await fetch("https://love-your-city-app.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: username,
        password: password,
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    try {
      // const data = await res.json()
      if (res.status === 200) {
        history.push("/log-in")
      }
    } catch(e) {
      console.log(e);
    }
  }
  return (
    <section className="sign-up">
      <div className="container sign-up-container">
        <h1 className="sign-up-h1">Sign Up</h1>
        { !isValidForm && <p className="valid-details">Please provide valid details </p> }
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="pill-btn blue">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;