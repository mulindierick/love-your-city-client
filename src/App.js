import React from "react";
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TestHomePage from "./components/TestHomePage";
import MyCampaign from "./components/MyCampaign";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TestHomePage} />
        <Route exact path="/log-in" component={LogIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/my-campaign" component={MyCampaign} />
      </Switch>
    </Router>
  );
}

export default App;
