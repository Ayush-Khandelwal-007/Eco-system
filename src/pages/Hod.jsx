import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import HodDashboard from "../HoDComponent/HodDashboard";

function Hod() {
  return (
    <Router>
      <Switch>
        <Route exact path="/HoDDashboard">
          <HodDashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default Hod;
