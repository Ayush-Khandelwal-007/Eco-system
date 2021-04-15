import React from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { fade, makeStyles } from "@material-ui/core/styles";
import design from "./ProfileViewComponent/ProfileView.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  Listroot: {
    width: "100%",
    maxWidth: "36ch",
  },
  grow: {
    flexGrow: 1,
    background: "#77A6F7",
  },

  appBar: {
    background: "#070D59",
  },

  paper: {},
  GridContainer: {
    background: "#FFCCBC",
    cursor: "pointer",
    height: "180px",
    "&:hover": {
      backgroundColor: "#D3E3FC",
      boxShadow: "none",
    },
  },
  inline: {
    display: "inline",
  },
}));

function ProfileView() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={design.main}>
      <div className={design.heading}>
        <h1>Profile View</h1>
      </div>
      <div className={design.ProfileList}>
        <List className={classes.Listroot}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Nischay Nagar" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="IIT2019198"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Nischay Nagar
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Ayush Khandu" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="IIT2019240"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Ayush Khandelwal
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Rahul Rai" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="IIT2019194"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Rahul Rai
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </div>
    </div>
  );
}
export default ProfileView;
