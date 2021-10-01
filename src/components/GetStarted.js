import React from "react";
// import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Header from "./Header";
// import "./GetStarted.css";

function GetStarted() {
  return (
    <React.Fragment>
      <Header />
      <div className="Get-started-group">
        <section className="how-it-works">
          <h2>How it works</h2>
        </section>
        <br />
        <List />
        <GetStartedBtn />
      </div>
    </React.Fragment>
  );
}

const List = () => {
  return (
    <div className="get_started">
      <ol>
        <li>Register a campaign to help others in need of essential items.</li>
        <br />
        <li>Create a gift registry for your beneficiaries. </li>
        <br />
        <li>Invite others to give. </li>
        <br />
        <li>Monitor the campaign.</li>
        <br />
        <li>Pat yourself on the back for Loving your City.</li>
      </ol>
    </div>
  );
};

const GetStartedBtn = () => {
  return (
    <div>
      <button className="get_started_btn">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            width: "107px",
            margin: "0px auto",
          }}
        >
          Get Started
        </Link>
      </button>
    </div>
  );
};

export default GetStarted;
