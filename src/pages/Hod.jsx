import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import HoDNav from "../HoDComponent/HoDNav";
import HodDashboard from "../HoDComponent/HodDashboard";
import FacultyList from "../HoDComponent/FacultyList";
import TimeTable from "../HoDComponent/TimeTable";
import ExamSchedule from "../HoDComponent/ExamSchedule";
import Courses from "../HoDComponent/Courses";
import NoticeBoard from "../HoDComponent/NoticeBoard";

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
  backgroundContainer: {
    height: "100%",
    background: "#77A6F7",
    minHeight: "95vh",
    alignItems: "center",
    display: "flex",
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function Hod(props) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <HoDNav />
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <div className={classes.backgroundContainer}>
        <Router>
          <Switch>
            <Route exact path="/HODDashboard">
              <HodDashboard />
            </Route>
            <Route exact path="/HODDashboard/FacultyList">
              <FacultyList />
            </Route>
            <Route exact path="/HODDashboard/TimeTable">
              <TimeTable />
            </Route>
            <Route exact path="/HODDashboard/ExamSchedule">
              <ExamSchedule />
            </Route>
            <Route exact path="/HODDashboard/Courses">
              <Courses />
            </Route>
            <Route exact path="/HODDashboard/NoticeBoard">
              <NoticeBoard />
            </Route>
          </Switch>
        </Router>
      </div>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
}

export default Hod;
