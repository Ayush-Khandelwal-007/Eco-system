import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import HoDNav from "../HoDComponent/HoDNav";
import HodDashboard from "../HoDComponent/HodDashboard";
import FacultyList from "../HoDComponent/FacultyList";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
    background: "#77A6F7",
  },

  appBar: {
    background: "#070D59",
  },

  paper: {},
  GridContainer: {
    background: "#FFCCBC",
    cursor: "pointer",
    height: "180px",
    "&:hover": {
      backgroundColor: "#D3E3FC",
      boxShadow: "none",
    },
  },
}));

function Hod() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <HoDNav />
      </AppBar>
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
    </div>
  );
}

export default Hod;
