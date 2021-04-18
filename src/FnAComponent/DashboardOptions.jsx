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
import { formatMs, Input } from "@material-ui/core";
import forms from "./FnADashboard.module.css";

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
  const [checked, setChecked] = useState(false);
  const [lateFeeTime, setLateFeeTime] = useState(new Date());
  const [lateFeeAmount, setLateFeeAmount] = useState(0);
  const [changedAmount, setChangedAmount] = useState(0);
  const [showFeeDateAlert, setShowFeeDateAlert] = useState(false);

  const handleChangeEffect = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    db.collection("feeDeadline")
      .doc("1")
      .get()
      .then((resp) => {
        setLateFeeAmount(resp.data().amount);
        setLateFeeTime(resp.data().date);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        console.log(resp.data().date, today);
        if (new Date(resp.data().date) - new Date(today) <= 0) {
          setShowFeeDateAlert(true);
        }
      });
  }, []);

  useEffect(() => {
    db.collection("Students")
      .where("fees.due", ">", 0)
      .get()
      .then((querySnapshot) => {
        var list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setDefaultersList(list);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [db]);

  useEffect(() => {
    handleChangeEffect();
  }, []);

  // Notification Dialog
  const [open, setOpen] = useState(false);
  const [openFeeExt, setOpenFeeExt] = useState(false);
  const [extendedDate, setExtendedDate] = useState("");
  const [defaultersList, setDefaultersList] = useState([]);

  const applyLateFee = () => {
    defaultersList.forEach((item) => {
      db.collection("Students")
        .doc(item.email)
        .update({
          fees: {
            latefee: item.fees.latefee + parseInt(lateFeeAmount),
            semfee: item.fees.semfee,
            paid: item.fees.paid,
            due: item.fees.due + parseInt(lateFeeAmount),
          },
        });
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenFeeExt = () => {
    setOpenFeeExt(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseFeeExt = () => {
    setOpenFeeExt(false);
  };
  //Alert
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const updateTime = (ndate) => {
    db.collection("feeDeadline").doc("1").update({
      date: ndate,
    });
    setShowFeeDateAlert(false);
    setLateFeeTime(ndate);
    setExtendedDate("");
  };

  const updateAmount = (namount) => {
    db.collection("feeDeadline").doc("1").update({
      amount: namount,
    });
    setLateFeeAmount(namount);
    setChangedAmount(0);
  };

  return (
    <div>
      <Dialog open={showFeeDateAlert}>
        <DialogTitle id="customized-dialog-title">Late Fee</DialogTitle>
        <DialogContent dividers>
          <div className={forms.disp}>
            <label>Late fee time: </label>
            {lateFeeTime}
          </div>
          <div className={forms.disp}>
            <label>Late fee Amount: </label>
            {lateFeeAmount}
          </div>
          <div className={forms.row}>
            <label>
              <div>Enter New Date</div>
              <Input
                type="date"
                value={extendedDate}
                onChange={(e) => {
                  setExtendedDate(e.target.value);
                }}
              />
            </label>
            <label>
              <div>Enter Late Fee Amount</div>
              <Input
                type="number"
                value={changedAmount}
                onChange={(e) => {
                  setChangedAmount(e.target.value);
                }}
              />
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => updateTime(extendedDate)} color="primary">
            Change Date
          </Button>
          <Button onClick={() => updateAmount(changedAmount)} color="primary">
            Change Amount
          </Button>
          <Button onClick={() => applyLateFee()} color="primary">
            Apply Late Fees
          </Button>
        </DialogActions>
      </Dialog>

      <NotifyDialog
        onClose={handleCloseFeeExt}
        aria-labelledby="customized-dialog-title"
        open={openFeeExt}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseFeeExt}>
          Late Fee
        </DialogTitle>
        <DialogContent dividers={true}>
          <div className={forms.disp}>
            <label>Late fee time: </label>
            {lateFeeTime}
          </div>
          <div className={forms.disp}>
            <label>Late fee Amount: </label>
            {lateFeeAmount}
          </div>
          <div className={forms.row}>
            <label>
              <div>Enter New Date</div>
              <Input
                type="date"
                value={extendedDate}
                onChange={(e) => {
                  setExtendedDate(e.target.value);
                }}
              />
            </label>
            <label>
              <div>Enter late Fee Amount</div>
              <Input
                type="number"
                value={changedAmount}
                onChange={(e) => {
                  setChangedAmount(e.target.value);
                }}
              />
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => updateTime(extendedDate)} color="primary">
            Change Date
          </Button>
          <Button onClick={() => updateAmount(changedAmount)} color="primary">
            Change Amount
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
              <Grid item xs={3}>
                <Link to="FnADashboard/FnaNotification">
                  <Paper className={classes.paper}>
                    <img src={bell} alt="logo" />
                    <div className={FnADesign.paperTxt}>Send Notifications</div>
                  </Paper>
                </Link>
              </Grid>
            </Grow>
            <Grow in={checked} {...(checked ? { timeout: 500 } : {})}>
              <Grid item xs={3} onClick={handleClickOpenFeeExt}>
                <Paper className={classes.paper}>
                  <img src={deadline} alt="logo" />
                  <div className={FnADesign.paperTxt}>Deadline Extension</div>
                </Paper>
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
