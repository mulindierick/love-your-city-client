import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="page-title">
      <section className="heading">
        <h1>Love Your City</h1>
      </section>

      <br />
      <br />
      <div>
        <img className="landing_logo" src="LYC-primary.svg" alt="Logo" />
      </div>
      <br />
      <Paragraph />
      <br />
      <LearnMore />
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

      <p>Love Your City will help you create, launch and coordinate it.</p>
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

const LearnMore = () => {
  return (
    <div>
      <Link to="/get-started">
        <p className="learn_more">Learn More</p>
      </Link>
    </div>
  );
};

export default LandingPage;
