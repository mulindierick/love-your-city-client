import React from "react";
import SignIn from "./components/SignIn"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
