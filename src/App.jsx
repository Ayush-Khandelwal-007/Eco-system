import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import FnA from "./pages/FnA";
import Hod from "./pages/Hod";
import { useUser } from "./contexts/User";

function App() {
  const [state, dispatch] = useUser();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      console.log("dispatching data by local storage");
      dispatch(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state));
  });

  return (
    <div className="App">
      <Router>
        <div className="App">
          <Switch>
            <Route path="/studentDashboard">
              <StudentDashboard />
            </Route>
            <Route path="/HODDashboard">
              <Hod />
            </Route>
            <Route path="/FnADashBoard">
              <FnA />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route exact path="/">
              <Landing />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
