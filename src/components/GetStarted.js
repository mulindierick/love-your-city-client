import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuIcon from "@mui/icons-material/Menu";
import "./GetStarted.css";

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
    </div>
  );
}

const List = () => {
  return (
    <div>
      <p>Loren ipsum,,,,,,,, paragraph</p>
    </div>
  )
}

export default GetStarted;
