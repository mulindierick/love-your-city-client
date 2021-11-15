import React from "react";
import { useState } from "react";
import { Redirect } from "react-router";
import Header from "./Header";

const SignUp = () => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [url, setUrl] = useState("error");
  let [modalOpen, setModalOpen] = useState(false)
  
  const Modal = () => {
    return <div className="modal-bg">
        <div className="modal">
            <h1>Please input different values for your email and username</h1>
            <button className="pill-btn blue" onClick={() => setModalOpen(false)}>Ok</button>
        </div>
    </div>
  }

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
        console.log(data)
        setEmail("");
        setPassword("");
        setUsername("");
        setUrl(Object.keys(data)[0]);
        if (Object.keys(data)[0] === "error") setModalOpen(true)
      })
      .catch((e) => console.log(e));
  }
  return (
    <section className="sign-up">
      <Header />
      { modalOpen && <Modal /> }
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
          <button type="submit" className="pill-btn blue">Sign Up</button>
        </form>
      </div>
      {url === "error" ? <Redirect to="/sign-up" /> : <Redirect to="/" />}
    </section>
  );
};

export default SignUp;