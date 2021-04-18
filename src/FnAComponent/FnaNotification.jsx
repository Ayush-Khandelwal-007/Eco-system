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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const NotificationInput = withStyles(() => ({
  root: {
    width: "30vw",
    color: "#070D59 !important",
    fontSize: "10px",
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  container: {
    width: "auto",
    margin: 25,
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: "100%",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

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
      <div className={FnADesign.notificationDiv}>
        <div className={FnADesign.SelectionList}>
          <List className={classes.root} subheader={<li />}>
            {[0, 1, 2, 3, 4].map((sectionId) => (
              <li key={`section-${sectionId}`} className={classes.listSection}>
                <ul className={classes.ul}>
                  <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                  {[0, 1, 2].map((item) => (
                    <ListItem key={`item-${sectionId}-${item}`}>
                      <ListItemText primary={`Item ${item}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
        </div>
        <div className={FnADesign.MsgDiv}></div>
      </div>
    </div>
  );
}
