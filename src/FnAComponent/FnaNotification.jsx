import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FnADesign from "./FnADashboard.module.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { db } from "../Firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  container: {
    width: "auto",
    margin: 25,
  },
});

const GoBackBtn = withStyles(() => ({
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FnaNotification() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={FnADesign.main}>
      {console.log(defaultersList)}
      <div className={FnADesign.Nav}>
        <div className={FnADesign.HeadingTxt}>DEFAULTERS LIST</div>
        <GoBackBtn
          variant="contained"
          color="primary"
          onClick={() => {
            history.goBack();
          }}
        >
          Go&nbsp;Back&nbsp;to&nbsp;Menu
        </GoBackBtn>
      </div>
    </div>
  );
}
