import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import Header from "./Header";
import GoogleLogin from "react-google-login";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const LogIn = () => {
  const { prevUrl } = useContext(CampaignContext);
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [modalOpen, setModalOpen] = useState(false);
  let [modelContent, setModelContent] =
    useState(`Your username or password is incorrect. Please provide correct
  credentials`);
  let [loader, setLoader] = useState(["none", "block", "none"]);
  let [error, setError] = useState("success");

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

  const handleLogin = async (googleData) => {
    const res = await fetch(
      "https://render-lyc-app.onrender.com/login/google",
      {
        method: "POST",
        body: JSON.stringify({
          googleToken: googleData.tokenId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data["error"]) {
      setLoader(["none", "block", "none"]);
      if (data["error"] === "some account details are not correct") {
        setModelContent(
          `We could not find an account associated with this email. Please Create an account first.`
        );
        setError("error");
        setModalOpen(true);
      }
    } else {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(`${data["token"]["accessToken"]}`)
      );
      sessionStorage.setItem("user", JSON.stringify(data["user"]));
      prevUrl > 50 ? history.go(-1) : history.push("/campaigns");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setLoader(["none", "none", "block"]);
    fetch("https://render-lyc-app.onrender.com/login", {
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
        setLoader(["none", "block", "none"]);
        setError("error");
        setModalOpen(true);
      });
  }
  return (
    <section className="log-in">
      <Header />
      {modalOpen && <BasicAlerts />}

      <div
        className="container log-in-container"
        style={{ justifyContent: "center" }}
      >
        <h1 className="log-in-h1">Log In</h1>
        {/* <div
          onClick={() => setLoader(["block", "none", "none"])}
          style={{ display: loader[1] }}
        >
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={"single_host_origin"}
          />
        </div> */}
        {/* <div style={{ display: loader[0] }}>
          <LinearProgress />
        </div> */}
        {/* <div style={{ display: loader[0] }}>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Signing In ... "
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={"single_host_origin"}
          />
        </div> */}
        <div style={{ display: loader[2] }}>
          <CircularProgress />
          <div style={{ color: "white" }}>Logging in...</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: loader[1] }}>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onClick={() => {
              if (email === "demo@gmail.com") setEmail("");
            }}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onClick={() => {
              if (password === "demo") setPassword("");
            }}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="pill-btn blue">
            Log in
          </button>

          <Link to="/sign-up">
            <p style={{ color: "white" }}>
              Have no account?{" "}
              <span style={{ color: "#159CFE", textDecoration: "underline" }}>
                SignUp here
              </span>
            </p>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
