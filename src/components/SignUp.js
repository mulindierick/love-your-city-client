import React from "react";
import { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Header from "./Header";

const SignUp = () => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [url, setUrl] = useState("error");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://love-your-city-app.herokuapp.com/users", {
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
      .then((res) => res.json())
      .then((data) => {
        setEmail("");
        setPassword("");
        setUsername("");
        setUrl(Object.keys(data)[0]);
      })
      .catch((e) => console.log(e));
  }
  return (
    <section className="sign-up">
      <Header />
      <div className="container sign-up-container">
        <h1 className="sign-up-h1">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="pill-btn blue">
            <Link to="/get-started"> 
            Sign Up
            </Link>
          </button>
        </form>
      </div>
      {url === "error" ? <Redirect to="/sign-up" /> : <Redirect to="/" />}
    </section>
  );
};

export default SignUp;