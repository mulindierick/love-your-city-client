import React from "react";
import { Username } from "./components/Username";
import { Password } from "./components/Password";
import { Button } from "./components/Button";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <section className="main-container">
        <h1>Sign in</h1>
        <Username />
        <Password />
        <Button />
      </section>
    </Router>
  );
}

export default App;

<div className="App">
  {/* <h1>Sign in</h1>
    <Username />
    <Password /> */}
</div>;
