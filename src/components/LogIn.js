import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";

const LogIn = () => {
  const { prevUrl } = useContext(CampaignContext);
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

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
      <div className="container log-in-container">
        <h1 className="log-in-h1">Log in</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Log in
          </button>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
