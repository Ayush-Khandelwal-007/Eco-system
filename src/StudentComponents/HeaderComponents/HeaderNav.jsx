import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  DialogActions,
  DialogContentText,
  MenuItem,
  Typography,
  DialogTitle,
  TextField,
  Snackbar,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import header from "./Header.module.css";
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";
import { useHistory } from "react-router-dom";
import { useUser } from "../../contexts/User";
import { db } from "../../Firebase";
import moment from "moment";
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 320,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 320,
    background: "#FFCCBC",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "center",
  },
  chevicon: {
    marginLeft: "auto",
  },
}));
function HeaderNav() {
  const [state, dispatch] = useUser();
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [type,setType]=useState('error')
  const [prevPass, setPrevPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('')
  const [openAlert, setOpenAlert] = useState(false);


  const handleCloseAlert =(event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handlesubmitevent = () => {
    if(newPass===confirmPass){

      if(state.user.password!==prevPass){
        setError('Please enter the corect Present password')
        setOpenAlert(true);
      }
      else{
        db.collection('Students').doc(state.user.email).set({
          password:newPass,
        },{merge:true})

        setPrevPass('');
        setNewPass('');
        setConfirmPass('');
        setOpenChangePassword(false);
      }
    }
    else {
      setError('Please Confirm your password as New password and confirm password dont match.')
      setOpenAlert(true);
    }
  }

  useEffect(() => {
    db.collection('Students').doc(state.user.email).collection("notification").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setNotifications(
        snapshot.docs.map((doc) => {
          const dateTimeString = moment.unix(doc.data().timestamp).format("DD-MM-YYYY HH:mm:ss");
          return {
            id: doc.id,
            message: doc.data().message,
            time: dateTimeString,
          };
        })
      );
    });
    // console.log(notifications);
  }, []);

  const deleteNoti = (id) => {
    db.collection('Students').doc(state.user.email).collection("notification").doc(id).delete();
  }

  const goLogout = () => {
    dispatch({
      type: "UNSET_USER",
    });
    history.push("/login");
    localStorage.clear();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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

  const classes = useStyles();

  //Notification
  const [notificationDrawer, setNotificationDrawer] = useState(false);

  return (
    <div className={header.nav}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={type}>
          {error}
        </Alert>
      </Snackbar>
      <Dialog
        open={openChangePassword}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The Password Could be seen and changed by the administration.
          </DialogContentText>
          <form className={header.changePassForm}>
            <TextField
              type='password'
              label={'Present Password'}
              value={prevPass}
              onChange={(e) => {
                setPrevPass(e.target.value);
              }}
            />

            <TextField
              type='password'
              label={'New Password'}
              value={newPass}
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
            />
            <TextField
              type='password'
              label={'Confirm Password'}
              value={confirmPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChangePassword(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handlesubmitevent} color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={"right"}
        open={notificationDrawer}
        onClose={() => {
          setNotificationDrawer(false);
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap>
            Notifications
          </Typography>
          <IconButton
            className={classes.chevicon}
            onClick={() => setNotificationDrawer(false)}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        {notifications.map((not, index) => {
          return (
            <div key={not.id} className={header.NotificationLi}>
              <Divider />
              <Typography gutterBottom>
                <div className={header.notiRow}>
                  {not.message}
                  <div onClick={() => deleteNoti(not.id)}> <CancelTwoToneIcon /></div>
                </div>
              </Typography>
              <div className={header.notiTime}>{not.time}</div>
              {index === notifications.length - 1 ? null : <hr />}
            </div>
          );
        })}
        <Divider />
      </Drawer>
      <div>
        <NotificationsNoneTwoToneIcon
          style={{
            fontSize: "4vh",
            color: "#ffffff",
            marginRight: "2vw",
            cursor: "pointer",
          }}
          onClick={() => setNotificationDrawer(true)}
        />
      </div>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
          <MenuItem onClick={goLogout}>Logout</MenuItem>
          <MenuItem onClick={() => setOpenChangePassword(true)}>Change Password</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default HeaderNav;
