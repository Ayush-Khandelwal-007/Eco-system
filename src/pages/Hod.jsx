import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import HodDashboard from "../HoDComponent/HodDashboard";
import FacultyList from "../HoDComponent/FacultyList";

function Hod() {
  return (
    <Router>
      <Switch>
        <Route exact path="/HoDDashboard">
          <HodDashboard />
        </Route>
        <Route exact path="/HoDDashboard/FacultyList">
          <FacultyList />
        </Route>
      </Switch>
    </Router>
  );
}

export default Hod;
