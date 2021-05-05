import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import design from "./register.module.css";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function Review() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review Application
      </Typography>
      <div className={design.main}>
        <div className={design.Name}>
          <div>Name :&nbsp;</div>
          <div>Nischay Nagar</div>
        </div>
        <div className={design.Address}>
          <div>Address :&nbsp;</div>
          <div>Hoshangabad road ,Bhopal</div>
        </div>
        <div className={design.Address}>
          <div>Branch :&nbsp;</div>
          <div>IT</div>
        </div>
      </div>
      <Typography variant="h7" gutterBottom>
        Courses
      </Typography>
      <List>
        <Typography variant="h8">Core Courses</Typography>
        {generate(
          <ListItem>
            <ListItemText primary="Course" />
          </ListItem>
        )}
      </List>
      <List>
        <Typography variant="h8">Addons</Typography>
        {generate(
          <ListItem>
            <ListItemText primary="Course" />
          </ListItem>
        )}
      </List>
      <List>
        <Typography variant="h8">Electives</Typography>
        {generate(
          <ListItem>
            <ListItemText primary="Course" />
          </ListItem>
        )}
      </List>
    </React.Fragment>
  );
}
