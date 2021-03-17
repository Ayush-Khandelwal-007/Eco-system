import React, { useContext, useState } from "react";
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
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import header from "./Header.module.css";
import { Link } from "react-router-dom";
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function HeaderNav() {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  const goLogout = () => {
    setUser(null);
    console.log("user is", { user });
    history.push("login");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosen = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
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
  const NotifyDialog = withStyles((theme) => ({
    paper: {
      borderRadius: 20,
    },
  }))(Dialog);
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

  return (
    <div className={header.nav}>
      <div>
        <NotificationsNoneTwoToneIcon
          style={{
            fontSize: "4vh",
            color: "#ffffff",
            marginRight: "2vw",
            cursor: "pointer",
          }}
          onClick={handleClickOpen}
        />
        <NotifyDialog
          onClose={handleClosen}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClosen}>
            Notifications
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Dear Navneet Bhole, you are requested to pay your due fees.Please
              ignore if already paid.
            </Typography>
            <hr />
            <Typography gutterBottom>
              Dear Navneet Bhole, you are requested to pay your due fees.Please
              ignore if already paid.
            </Typography>
            <hr />
            <Typography gutterBottom>
              Dear Navneet Bhole, you are requested to pay your due fees.Please
              ignore if already paid.
            </Typography>
            <hr />
            <Typography gutterBottom>
              Dear Navneet Bhole, you are requested to pay your due fees.Please
              ignore if already paid.
            </Typography>
            <hr />
            <Typography gutterBottom>
              Dear Navneet Bhole, you are requested to pay your due fees.Please
              ignore if already paid.
            </Typography>
            <hr />
            <Typography gutterBottom>
              Dear Navneet Bhole, you are requested to pay your due fees.Please
              ignore if already paid.
            </Typography>
            <hr />
            <Typography gutterBottom>
              Dear Navneet Bhole, you are requested to pay your due fees.Please
              ignore if already paid.
            </Typography>
          </DialogContent>
        </NotifyDialog>
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
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={goLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default HeaderNav;
