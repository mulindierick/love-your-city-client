import React from "react";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Campaigns from "./components/Campaigns";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/campaigns" component={Campaigns} />
      </Switch>
    </Router>
  );
}

export default App;
