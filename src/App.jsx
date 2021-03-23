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
import { AuthContext } from "./contexts/AuthContext";
import { useUser } from "./contexts/User";

function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [state, dispatch] = useUser();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      console.log("dispatching data by local storage");
      dispatch(JSON.parse(user));
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state));
  });

  return (
    <div className="App">
      <Router>
        <AuthContext.Provider value={providerValue}>
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
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
