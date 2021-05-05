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

export default function Review({ studentInfo, checkedCore, checkedProjectTypeCourse, checkedElective }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review Application
      </Typography>
      <div className={design.main}>
        <div className={design.Name}>
          <div>Name :&nbsp;</div>
          <div>{`${studentInfo.firstName} ${studentInfo.lastName}`}</div>
        </div>
        <div className={design.Address}>
          <div>Address :&nbsp;</div>
          <div>{`${studentInfo.address},${studentInfo.city}`}</div>
        </div>
        <div className={design.Address}>
          <div>Branch :&nbsp;</div>
          <div>{studentInfo.branch}</div>
        </div>
      </div>
      <List>
        <Typography variant="h8">Core Courses</Typography>
        {checkedCore.map((course,index) => <ListItem key={course.CouseId}>{index+1+".)  "}
          <ListItemText primary={course.CourseCode}/>
        </ListItem>)}
      </List>
      <List>
        <Typography variant="h8">Project Type</Typography>
        {checkedProjectTypeCourse.map((course,index) => <ListItem key={course.CouseId}>{index+1+".)  "}
          <ListItemText primary={course.CourseCode}/>
        </ListItem>)}
      </List>
      <List>
        <Typography variant="h8">Electives</Typography>
        {checkedElective.map((course,index) => <ListItem key={course.CouseId}>{index+1+".)  "}
          <ListItemText primary={course.CourseCode}/>
        </ListItem>)}
      </List>
    </React.Fragment>
  );
}
