import React from 'react';
import bell from "../images/Bell.svg";
import deadline from "../images/Deadline.svg";
import list from "../images/DefaulterList.svg";
import fee from "../images/Fee.svg";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FnADesign from './FnADashboard.module.css';
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      background: "#FFCCBC",
      boxShadow: "0px 4px 20px #525CDD",
      borderRadius: "19px",
      width: "200px",
      height: "220px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: '#D3E3FC',
        boxShadow: 'none',
      }
    },
    control: {
      padding: theme.spacing(2),
    },
  }));


export default function DashboardOptions() {

    const classes = useStyles();
    const history = useHistory();

    return (
          <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
          <Grid container justify="center" spacing={5}>
              <Grid item>
              <Link to="/feechart">
                  <Paper className={classes.paper}>
                    <img
                    src={fee}
                    alt="logo"
                    />
                    <div className={FnADesign.paperTxt}>Fee Chart</div>
                  </Paper>
                </Link>
              </Grid>
              <Grid item>
              <Link to="/DefaulterList">
                <Paper className={classes.paper}>
                <img
                  src={list}
                  alt="logo"
                  />
                  <div className={FnADesign.paperTxt}>Defaulters List</div>
                </Paper>
                </Link>
              </Grid>
              <Grid item>
              <Link to="/sendnotification">
                <Paper className={classes.paper}>
                  <img
                      src={bell}
                      alt="logo"
                  />
                  <div className={FnADesign.paperTxt}>Send Notifications</div>
                </Paper>
              </Link>
              </Grid>
              <Grid item>
              <Link to="/deadlineext">
                <Paper className={classes.paper}>
                <img
                  src={deadline}
                  alt="logo"
                  />
                  <div className={FnADesign.paperTxt}>Deadline Extension</div>
                </Paper>
                </Link>
              </Grid>
          </Grid>
        </Grid>
        </Grid>
    )
}
