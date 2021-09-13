import React from "react";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Campaigns from "./components/Campaigns";
import CreateCampaign from "./components/CreateCampaign";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShowCampaign from "./components/ShowCampaign";
// edit campaing, delete campaing, get campaign stats
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/campaigns" component={Campaigns} />
        <Route exact path="/show-campaign" component={ShowCampaign} />
        <Route exact path="/create-campaign" component={CreateCampaign} />
      </Switch>
    </Router>
  );
}

export default App;
