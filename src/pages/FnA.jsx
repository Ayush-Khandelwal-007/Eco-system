import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import FnADashboard from "../FnAComponent/FnADashboard";
import DefaultersList from "../FnAComponent/DefaultersList";
import FeeChart from "../FnAComponent/FeeChart";

export default function FnARoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/FnADashboard">
          <FnADashboard />
        </Route>
        <Route exact path="/FnADashboard/feechart">
          <FeeChart />
        </Route>
        <Route exact path="/FnADashboard/DefaulterList">
          <DefaultersList />
        </Route>
        <Route exact path="/FnADashboard/deadlineext"></Route>
      </Switch>
    </Router>
  );
}
