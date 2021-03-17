import React, { useContext, useState } from "react";
import FnADesign from "./FnADashboard.module.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import DashboardOptions from "./DashboardOptions";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const LogoutBtn = withStyles(() => ({
  root: {
    width: "180px",
    height: "45px",
    color: "#000000",
    background: "#FFCCBC",
    boxShadow: "0px 4px 20px #525CDD",
    borderRadius: "10px",
    letterSpacing: "1.25px",
    "&:hover": {
      backgroundColor: "#070D59",
      color: "#ffffff",
      boxShadow: "none",
    },
  },
}))(Button);

export default function FnADashboard() {
  const { user, setUser } = useContext(AuthContext);

  const history = useHistory();
  const goLogout = () => {
    setUser(null);
    console.log("user is", { user });
    history.push("login");
  };

  return (
    <div className={FnADesign.main}>
      <div className={FnADesign.Nav}>
        <div className={FnADesign.HeadingTxt}>
          WELCOME TO FEE AND ADMINISTRATION
        </div>
        <LogoutBtn variant="contained" color="primary" onClick={goLogout}>
          Logout
        </LogoutBtn>
      </div>
      <div className={FnADesign.DashboardFeat}>
        <DashboardOptions />
      </div>
    </div>
  );
}
