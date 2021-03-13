import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import FnADashboard from '../FnAComponent/FnADashboard';
import DefaultersList from '../FnAComponent/DefaultersList';
  
  export default function FnARoutes() {
      return (
            <Router>
                <Switch>
                    <Route path="/FnADashboard">
                    <FnADashboard />
                    </Route>
                    <Route path="/feechart">
                    </Route>
                    <Route path="/DefaulterList">
                    <DefaultersList />
                    </Route>
                    <Route path="/sendnotification">
                    </Route>
                    <Route path="/deadlineext">
                    </Route>
                </Switch>
            </Router>
      )
  }
  

