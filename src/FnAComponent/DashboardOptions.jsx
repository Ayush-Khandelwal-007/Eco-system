import React, { useEffect, useContext, useState } from "react";
import {
  fee,
  bell,
  defaulterList,
  deadline,
  student,
  feeApproval,
} from "../images";
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

const NotificationInput = withStyles(() => ({
  root: {
    width: "30vw",
    color: "#070D59 !important",
    fontSize: "10px",
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    background: "#FFCCBC",
    boxShadow: "0px 4px 20px #525CDD",
    borderRadius: "19px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#D3E3FC",
      boxShadow: "none",
    },
  },
  control: {
    padding: theme.spacing(2),
  },
}));

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

//Alert on sending notifications
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DashboardOptions() {
  const [notification, setNotification] = useState("");
  const classes = useStyles();
  const history = useHistory();

  //Glow Effect
  const [checked, setChecked] = React.useState(false);

  const handleChangeEffect = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    handleChangeEffect();
  }, []);

  // Notification Dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Alert
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
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
    <div>
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

      {/* Alert */}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Notifications sent successfully!
        </Alert>
      </Snackbar>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={5}>
            <Grow in={checked}>
              <Grid item xs={3}>
                <Link to="FnADashboard/feechart">
                  <Paper className={classes.paper}>
                    <img src={fee} alt="logo" />
                    <div className={FnADesign.paperTxt}>Fee Chart</div>
                  </Paper>
                </Link>
              </Grid>
            </Grow>
            <Grow in={checked} {...(checked ? { timeout: 500 } : {})}>
              <Grid item xs={3}>
                <Link to="FnADashboard/DefaulterList">
                  <Paper className={classes.paper}>
                    <img src={defaulterList} alt="logo" />
                    <div className={FnADesign.paperTxt}>Defaulters List</div>
                  </Paper>
                </Link>
              </Grid>
            </Grow>
            <Grow in={checked} {...(checked ? { timeout: 500 } : {})}>
              <Grid item onClick={handleClickOpen} xs={3}>
                <Paper className={classes.paper}>
                  <img src={bell} alt="logo" />
                  <div className={FnADesign.paperTxt}>Send Notifications</div>
                </Paper>
              </Grid>
            </Grow>
            <Grow in={checked} {...(checked ? { timeout: 500 } : {})}>
              <Grid item xs={3}>
                <Link to="FnADashboard/deadlineext">
                  <Paper className={classes.paper}>
                    <img src={deadline} alt="logo" />
                    <div className={FnADesign.paperTxt}>Deadline Extension</div>
                  </Paper>
                </Link>
              </Grid>
            </Grow>
            <Grow in={checked} {...(checked ? { timeout: 500 } : {})}>
              <Grid item xs={3}>
                <Link to="FnADashboard/StudentRegistration">
                  <Paper className={classes.paper}>
                    <img src={student} alt="logo" />
                    <div className={FnADesign.paperTxt}>
                      Student Registration
                    </div>
                  </Paper>
                </Link>
              </Grid>
            </Grow>
            <Grow in={checked} {...(checked ? { timeout: 500 } : {})}>
              <Grid item xs={3}>
                <Link to="FnADashboard/FeeApproval">
                  <Paper className={classes.paper}>
                    <img src={feeApproval} alt="logo" />
                    <div className={FnADesign.paperTxt}>Fee Approval</div>
                  </Paper>
                </Link>
              </Grid>
            </Grow>
            <Grow in={checked} {...(checked ? { timeout: 500 } : {})}>
              <Grid item xs={3}>
                <Link to="FnADashboard/FeeAtReg">
                  <Paper className={classes.paper}>
                    <img src={feeApproval} alt="logo" />
                    <div className={FnADesign.paperTxt}>Fee At Registation</div>
                  </Paper>
                </Link>
              </Grid>
            </Grow>
            <Grow in={checked} {...(checked ? { timeout: 500 } : {})}>
              <Grid item xs={3}>
                <Link to="FnADashboard/FeeAtAdd">
                  <Paper className={classes.paper}>
                    <img src={feeApproval} alt="logo" />
                    <div className={FnADesign.paperTxt}>Fee At Admission</div>
                  </Paper>
                </Link>
              </Grid>
            </Grow>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
