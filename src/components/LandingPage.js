import React from "react";
import { Link } from "react-router-dom";
import DirectionsRunRoundedIcon from "@material-ui/icons/DirectionsRunRounded";
//import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

const LandingPage = () => {
  return (
    <div className="page-title">
      <section className="heading">
        <h1>Love your City</h1>
      </section>

      <br />
      <br />
      <div className="avatar">
        <DirectionsRunRoundedIcon
          style={{
            margin: "auto",
            height: "152.13414001464844px",
            width: "175.7042236328125px",
            left: "92px",
            top: "101px",
            borderRadius: "100%",
            background: "white",
            color: "#213368",
          }}
        />
        {/* <FavoriteRoundedIcon
          style={{
            margin: "auto",
            height: "20.64px",
            width: "21.43px",
            left: "1px",
            bottom: "58.67px",
            borderRadius: "100%",
            color: "#e20e0e",
            position: "relative",
            transform: "rotate(9deg)",
          }}
        /> */}
      </div>
      <br />
      <Paragraph />
      <br />
      <Footer />
      <Form />
    </div>
  );
};

const Paragraph = () => {
  return (
    <section className="main-paragraph">
      <p className="paragraph-1">
        Do you have a charitable campaign you want to start?
      </p>
      <br />
      {/* <p className="paragraph-2">I am Sam</p> */}
      <p>I'll help you create, launch and coordinate it.</p>
    </section>
  );
};

const Form = () => {
  return (
    <div>
      <button className="signIn-btn">
        <Link to="/log-in" style={{ textDecoration: "none", color: "white" }}>
          Login
        </Link>
      </button>
      <br />
      <br />
      <button className="signUp-btn">
        <Link
          to="/sign-up"
          style={{ textDecoration: "none", color: "rgba(33, 51, 104, 1)" }}
        >
          Sign up
        </Link>
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      <Link to="/get-started">
        <p className="footer">Learn More</p>
      </Link>
    </div>
  );
};

export default LandingPage;
