import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import Header from "./Header";

const LogIn = () => {
  const { prevUrl } = useContext(CampaignContext);
  const history = useHistory();
  let [email, setEmail] = useState("default@gmail.com");
  let [password, setPassword] = useState("default");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://love-your-city-app.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify({
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
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(`${data["token"]["accessToken"]}`)
        );
        sessionStorage.setItem("user", JSON.stringify(data["user"]));
        prevUrl > 50 ? history.go(-1) : history.push("/campaigns");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <section className="log-in">
      <Header/>
      <div className="container log-in-container">
        <h1 className="log-in-h1">Log in</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onClick={() => setEmail("")}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onClick={() => setPassword("")}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="pill-btn blue">
            Log in
          </button>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
