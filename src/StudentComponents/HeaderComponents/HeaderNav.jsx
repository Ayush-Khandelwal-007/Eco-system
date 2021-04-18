import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  withStyles,
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
  NotificationLi: {
    background: "#fff",
    padding: "0 10px",
  },
}));
function HeaderNav() {
  const [state, dispatch] = useUser();
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    db.collection("notifications").onSnapshot((snapshot) => {
      setNotifications(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            message: doc.data().message,
          };
        })
      );
    });
    // console.log(notifications);
  }, []);

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
            <div key={not.id} className={classes.NotificationLi}>
              <Typography gutterBottom>{not.message}</Typography>
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
        </Menu>
      </div>
    </div>
  );
}

export default HeaderNav;
