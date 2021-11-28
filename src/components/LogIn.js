import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import Header from "./Header";
import GoogleLogin from "react-google-login";

const LogIn = () => {
  const { prevUrl } = useContext(CampaignContext);
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleLogin = async (googleData) => {
    const res = await fetch("https://love-your-city-app.herokuapp.com/login/google", {
      method: "POST",
      body: JSON.stringify({
        googleToken: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    sessionStorage.setItem(
      "accessToken",
      JSON.stringify(`${data["token"]["accessToken"]}`)
    );
    sessionStorage.setItem("user", JSON.stringify(data["user"]));
    prevUrl > 50 ? history.go(-1) : history.push("/campaigns");
  };

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
      <Header />
      <div className="container log-in-container">
        <h1 className="log-in-h1">Log In</h1>

        <GoogleLogin
          width={10}
          clientId={process.env.CLIENT_ID}
          buttonText="Log In with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={"single_host_origin"}
        />

        <form>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onClick={() => setEmail("")}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onClick={() => setPassword("")}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="pill-btn blue"
          >
            Log in
          </button>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
