import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
// import "./GetStarted.css";

function GetStarted() {
  return (
    <div>
      <section className="get_started_header">
        <img className="get_started_logo" src="/LYC-primary.svg" alt="logo" />
        <h2 className="">Love Your City</h2>
        <MenuIcon
          style={{
            color: "rgba(255, 255, 255, 1)",
            width: "24px",
            hieght: "186px",
            marginTop: "8px",
            display: "flex",
            marginLeft: "auto",
            marginRight: "6px",
          }}
        />
      </section>
      <section className="how-it-works">
        <h2>How it works</h2>
      </section>
      <br />
      <article>
        <List />
      </article>
      <GetStartedBtn />
    </div>
  );
}

const List = () => {
  return (
    <div className="get_started">
      <p>
        <ol>
          <li>
            1. Register a campaign to help others in need of essential items
          </li>
          <br />
          <li>2. Create a gift registry for your beneficiaries </li>
          <br />
          <li>3. Invite others to give </li>
          <br />
          <li>4. Monitor the campaign </li>
          <br />
          <li>5. Pat yourself on the back for Loving your City</li>
        </ol>
      </p>
    </div>
  );
};

const GetStartedBtn = () => {
  return (
    <div>
      <button className="get_started_btn">
        <Link
          to="/"
          style={{ textDecoration: "none", color: "white", width: "107px" }}
        >
          Get Started
        </Link>
      </button>
    </div>
  );
};

export default GetStarted;
