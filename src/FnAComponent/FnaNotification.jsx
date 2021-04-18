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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import firebase from 'firebase';

const NotificationInput = withStyles(() => ({
  root: {
    width: "100%",
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
    maxHeight: "98%",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  divider: {
    margin: "15px 0",
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
  const [checked, setChecked] = useState([]);
  const [checkedh, setCheckedh] = useState([]);
  const [students, setStudents] = useState([])
  const [hods, setHods] = useState([])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleToggleh = (value) => () => {
    const currentIndex = checkedh.indexOf(value);
    const newChecked = [...checkedh];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedh(newChecked);
  };
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
    checked.forEach((item) => {
      db.collection('Students').doc(item.email).collection('notification').add({
        message: notification,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    })
    setChecked([])

    checkedh.forEach((item) => {
      db.collection('HoD').doc(item.email).collection('notification').add({
        message: notification,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    })
    setCheckedh([])
    setNotification("");
    setOpen(false);
    setOpenAlert(true);
  };

  // useEffect(() => {
  //   console.log(checked, checkedh);
  // }, [checked, checkedh])

  useEffect(() => {
    db.collection('Students')
      .onSnapshot((snapshot) => {
        var list = [];
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setStudents(list);
      }, (error) => {
        console.log("error", error);
      });

    db.collection('HoD')
      .onSnapshot((snapshot) => {
        var list = [];
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setHods(list);
      }, (error) => {
        console.log("error", error);
      });
  }, [])

  return (
    <div className={FnADesign.main}>
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
            <li className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader>{`Students`}</ListSubheader>
                {students.map((student, index) => {
                  const labelId = `checkbox-list-secondary-label-${index}`;
                  return (
                    <ListItem key={student.roll} button>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar of ${student.name}`}
                          src={student.imageurl}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={labelId}
                        primary={student.roll}
                        secondary={student.name}
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(student)}
                          checked={checked.indexOf(student) !== -1}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
                <ListSubheader>{`HOD`}</ListSubheader>
                {hods.map((hod, index) => {
                  const labelId = `checkbox-list-secondary-label-${index}`;
                  return (
                    <ListItem key={hod.branch} button>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar of ${hod.branch} branch}`}
                          src={hod.imageurl}
                        />
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={hod.name} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          onChange={handleToggleh(hod)}
                          checked={checkedh.indexOf(hod) !== -1}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </ul>
            </li>
          </List>
        </div>
        <div className={FnADesign.MsgDiv}>
          <div className={FnADesign.NotifyTitle}>New Notification</div>
          <Divider className={classes.divider} />
          <NotificationInput
            required
            autoComplete="off"
            variant="outlined"
            multiline
            rows={8}
            rowsMax={8}
            id="outlined-multiline-static"
            label="Notification"
            value={notification}
            onChange={(e) => {
              setNotification(e.target.value);
            }}
          />
          <div className={FnADesign.SendBtnDiv}>
            <Button color="primary" onClick={handleSend}>
              SEND
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
