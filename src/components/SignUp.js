import React from "react";
import { useState } from "react";
import { Redirect, useHistory } from "react-router";
import Header from "./Header";
import GoogleLogin from "react-google-login";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const SignUp = () => {
  let history = useHistory();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [url, setUrl] = useState("error");
  let [modalOpen, setModalOpen] = useState(false);
  let [loader, setLoader] = useState(["none", "block", "none"]);
  let [error, setError] = useState("success");
  let [modelContent, setModelContent] =
    useState(`An account with similar username or email already exists. Please
  provide a different username and email`);

  function BasicAlerts() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack sx={{ width: "40%", alignContent: "center" }} spacing={2}>
          <Alert
            variant="filled"
            severity={error}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setModalOpen(false);
                  setLoader(["none", "block", "none"]);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {modelContent}
          </Alert>
        </Stack>
      </div>
    );
  }

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
      history.push("/campaigns");
    } else {
      setModelContent(
        `An account with a similar email already exists. Log In instead`
      );
      setModalOpen(true);
      setError("error");
      setLoader(["none", "block", "none"]);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setLoader(["none", "none", "block"]);
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
        setEmail("");
        setPassword("");
        setUsername("");
        setUrl(Object.keys(data)[0]);
        if (Object.keys(data)[0] === "error") {
          setLoader(["none", "block", "none"]);
          setError("error");
          setModalOpen(true);
        }
      })
      .catch((e) => console.log(e));
  }
  return (
    <section className="sign-up">
      <Header />
      {modalOpen && <BasicAlerts />}
      <div className="container sign-up-container">
        <h1 className="sign-up-h1">Sign Up</h1>
        <div style={{ display: loader[0] }}>
          <LinearProgress />
        </div>
        <div style={{ display: loader[0] }}>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Signing up ..."
            onSuccess={handleSignUp}
            onFailure={handleSignUp}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div
          onClick={() => setLoader(["block", "none", "none"])}
          style={{ display: loader[1] }}
        >
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Sign Up with Google"
            onSuccess={handleSignUp}
            onFailure={handleSignUp}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div style={{ display: loader[2] }}>
          <CircularProgress />
          <div style={{ color: "white" }}>Signing up...</div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: loader[1] }}>
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
          <button type="submit" className="pill-btn blue">
            Sign Up
          </button>
          <Link to="/log-in">
            <p style={{ color: "white" }}>
              Already have an account?{" "}
              <span style={{ color: "#159CFE", textDecoration: "underline" }}>
                Login here
              </span>
            </p>
          </Link>
        </form>
      </div>
      {url === "error" ? (
        <Redirect to="/sign-up" />
      ) : (
        <Redirect to="/log-in" />
      )}
    </section>
  );
};

export default SignUp;
