import React from "react";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Campaigns from "./components/Campaigns";
import RegisterCampaign from "./components/RegisterCampaign";
import { Preview } from "./components/Preview";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShowCampaign from "./components/ShowCampaign";
import Donate from "./components/DonateToCampaign";
import LandingPage from "./components/LandingPage";
import GetStarted from "./components/GetStarted";
require('dotenv').config()

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/get-started" component={GetStarted} />
        <Route exact path="/log-in" component={LogIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/campaigns" component={Campaigns} />
        <Route exact path="/show-campaign/:id" component={ShowCampaign} />
        <Route exact path="/register-campaign" component={RegisterCampaign} />
        <Route exact path="/preview" component={Preview} />
        <Route exact path="/donate/:id" component={Donate} />
      </Switch>
    </Router>
  );
}

export default App;
