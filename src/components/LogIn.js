import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import Header from "./Header";

const LogIn = () => {
  const { prevUrl } = useContext(CampaignContext);
  const history = useHistory();
  let [email, setEmail] = useState("demo@gmail.com");
  let [password, setPassword] = useState("demo");
  let [modalOpen, setModalOpen] = useState(false)

  const Modal = () => {
    return <div className="modal-bg">
        <div className="modal">
            <h1>Username and/or password incorrect. Please provide correct credentials.</h1>
            <button className="pill-btn blue" onClick={() => setModalOpen(false)}>Ok</button>
        </div>
    </div>
  }


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
        setModalOpen(true)
      });
  }
  return (
    <section className="log-in">
      <Header/>
      { modalOpen && <Modal /> }
      <div className="container log-in-container">
        <h1 className="log-in-h1">Log in</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onClick={() => {
              if (email === "demo@gmail.com") setEmail("")
            }}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onClick={() => {
              if (password === "demo") setPassword("")
            }}
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
