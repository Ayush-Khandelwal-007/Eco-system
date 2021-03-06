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
import { db } from "./Firebase";
import NoticeBoard from "./pages/NoticeBoard";

function App() {
  const [state, dispatch] = useUser();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const logintype = localStorage.getItem("logintype");
    if (user && logintype) {
      // console.log("dispatching data by local storage",user);
      // console.log(JSON.parse(localStorage.getItem('user')));
      // dispatch({
      //   type: "SET_USER",
      //   user: { ...JSON.parse(localStorage.getItem('user')) },
      //   userType: parseInt(logintype),
      // });
      try {
        const name = (loginType) => {
          switch (loginType) {
            case 1:
              return "Students";
              break;
            case 2:
              return "FnA";
              break;
            case 3:
              return "HoD";
              break;
            default:
              return null;
          }
        };
        var Juser = JSON.parse(user);
        var docRef = db.collection(name(parseInt(logintype))).doc(Juser.email);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch({
                type: "SET_USER",
                user: { ...doc.data() },
                userType: parseInt(logintype),
              });

              localStorage.setItem("user", JSON.stringify(doc.data()));
            } else {
              console.log(doc.data());
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } catch (error) {
        console.log(error);
      }
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="App">
          <Switch>
            <Route path="/studentDashboard">
              {state.user ? (
                state.userType === 1 ? (
                  <StudentDashboard />
                ) : (
                  <Redirect to="/Login" />
                )
              ) : (
                <Redirect to="/Login" />
              )}
            </Route>
            <Route path="/FnADashBoard">
              {state.user ? (
                state.userType === 2 ? (
                  <FnA />
                ) : (
                  <Redirect to="/Login" />
                )
              ) : (
                <Redirect to="/Login" />
              )}
            </Route>
            <Route path="/HODDashboard">
              {state.user ? (
                state.userType === 3 ? (
                  <Hod />
                ) : (
                  <Redirect to="/Login" />
                )
              ) : (
                <Redirect to="/Login" />
              )}
            </Route>
            <Route path="/Login">
              {state.user === null ? (
                <Login />
              ) : (
                (state.userType === 1 && <Redirect to="/studentDashboard" />) ||
                (state.userType === 2 && <Redirect to="/FnADashBoard" />) ||
                (state.userType === 3 && <Redirect to="/HODDashboard" />)
              )}
            </Route>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/NoticeBoard">
              <NoticeBoard />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
