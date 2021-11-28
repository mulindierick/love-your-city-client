import React from "react";
import { useState } from "react";
import { Redirect, useHistory } from "react-router";
import Header from "./Header";
import GoogleLogin from "react-google-login";

const SignUp = () => {
  let history = useHistory();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [url, setUrl] = useState("error");
  let [modalOpen, setModalOpen] = useState(false);

  const Modal = () => {
    return (
      <div className="modal-bg">
        <div className="modal">
          <h1>
            Username and email are already in use. Please provide a different
            username and email.
          </h1>
          <button className="pill-btn blue" onClick={() => setModalOpen(false)}>
            Ok
          </button>
        </div>
      </div>
    );
  };

  const handleSignUp = async (googleData) => {
    const res = await fetch(
      "https://love-your-city-app.herokuapp.com/users/google",
      {
        method: "POST",
        body: JSON.stringify({
          token: googleData.tokenId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data["msg"]) {
      history.push("/log-in");
    } else {
      history.push("/sign-up");
    }
  };

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
        console.log(data);
        setEmail("");
        setPassword("");
        setUsername("");
        setUrl(Object.keys(data)[0]);
        if (Object.keys(data)[0] === "error") setModalOpen(true);
      })
      .catch((e) => console.log(e));
  }
  return (
    <section className="sign-up">
      <Header />
      {modalOpen && <Modal />}
      <div className="container sign-up-container">
        <h1 className="sign-up-h1">Sign Up</h1>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Sign Up with Google"
          onSuccess={handleSignUp}
          onFailure={handleSignUp}
          cookiePolicy={"single_host_origin"}
        />
        <form>
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
          <button
            onClick={handleSubmit}
            type="submit"
            className="pill-btn blue"
          >
            Sign Up
          </button>
        </form>
      </div>
      {url === "error" ? <Redirect to="/sign-up" /> : <Redirect to="/log-in" />}
    </section>
  );
};

export default SignUp;
