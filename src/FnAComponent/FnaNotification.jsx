import React, { useEffect, useContext, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grow from "@material-ui/core/Grow";
import FnADesign from "./FnADashboard.module.css";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { db } from "../Firebase";
import { formatMs, Input } from "@material-ui/core";
import forms from "./FnADashboard.module.css";

const NotificationInput = withStyles(() => ({
  root: {
    width: "30vw",
    color: "#070D59 !important",
    fontSize: "10px",
  },
}))(TextField);

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

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  paper: {
    borderRadius: 20,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const NotifyDialog = withStyles((theme) => ({
  paper: {
    borderRadius: 20,
  },
}))(Dialog);

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FnaNotification() {
  const classes = useStyles();
  const history = useHistory();
  const [openAlert, setOpenAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState("");

  //Alert

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    db.collection("notifications").add({
      message: notification,
    });
    setNotification("");
    setOpen(false);
    setOpenAlert(true);
  };

  return (
    <div className={FnADesign.main}>
      <NotifyDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Notify Students
        </DialogTitle>
        <DialogContent dividers>
          <NotificationInput
            required
            autoComplete="off"
            variant="outlined"
            multiline
            rows={4}
            rowsMax={8}
            id="outlined-multiline-static"
            label="Notification"
            value={notification}
            onChange={(e) => {
              setNotification(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSend} color="primary">
            SEND
          </Button>
        </DialogActions>
      </NotifyDialog>
      <div className={FnADesign.Nav}>
        <div className={FnADesign.HeadingTxt}>SEND NOTIFICATIONS</div>
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
