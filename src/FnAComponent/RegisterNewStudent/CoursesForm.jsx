import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { db } from "../../Firebase"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CoursesForm({ studentInfo, setStudentInfo ,checkedCore, setCheckedCore,checkedProjectTypeCourse, setCheckedProjectTypeCourse,checkedElective, setCheckedElective}) {
  const classes = useStyles();

  const [coursesIT, setCoursesIT] = React.useState([]);
  const [coursesECE, setCoursesECE] = React.useState([]);

  const handleChange = (event) => {
    setCheckedCore([]);
    setCheckedProjectTypeCourse([]);
    setCheckedElective([]);
    setStudentInfo({ ...studentInfo, branch: event.target.value });
  };

  React.useEffect(() => {

    db.collection("HoD").doc("ece@amigo.com").collection("courses")
      .onSnapshot((querySnapshot) => {
        var list = []
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data()});
        });
        setCoursesECE(list)
      })
  }, [db])

  React.useEffect(() => {
    db.collection("HoD").doc("it@amigo.com").collection("courses")
      .onSnapshot((querySnapshot) => {
        var list = []
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data()});
        });
        setCoursesIT(list)
      })
  }, [db])

  // Courses list
  //Core

  const handleToggleCore = (value) => () => {
    const currentIndex = checkedCore.indexOf(value);
    const newChecked = [...checkedCore];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedCore(newChecked);
  };

  //ProjectTypeCourse

  const handleToggleAddOn = (value) => () => {
    const currentIndex = checkedProjectTypeCourse.indexOf(value);
    const newChecked = [...checkedProjectTypeCourse];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedProjectTypeCourse(newChecked);
  };
  //Elective


  const handleToggleElective = (value) => () => {
    const currentIndex = checkedElective.indexOf(value);
    const newChecked = [...checkedElective];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedElective(newChecked);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Courses Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            required
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Branch
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={studentInfo.branch}
              onChange={handleChange}
              label="Branch"
            >
              <MenuItem value={"IT"}>IT</MenuItem>
              <MenuItem value={"ECE"}>ECE</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Core Courses
          </Typography>
          <List className={classes.root}>
            {
              studentInfo.branch === "IT" ? (
                coursesIT.filter((course)=>course.CourseType==="CORE").map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value.CourseId}
                      role={undefined}
                      dense
                      button
                      onClick={handleToggleCore(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checkedCore.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={value.CourseCode}
                      />
                    </ListItem>
                  );
                })
              ) : (
                coursesECE.filter((course)=>course.CourseType==="CORE").map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value.CourseId}
                      role={undefined}
                      dense
                      button
                      onClick={handleToggleCore(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checkedCore.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={value.CourseCode}
                      />
                    </ListItem>
                  );
                })
              )
            }
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Project Type
          </Typography>
          <List className={classes.root}>
          {
              studentInfo.branch === "IT" ? (
                coursesIT.filter((course)=>course.CourseType==="PROJECT").map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value.CourseId}
                      role={undefined}
                      dense
                      button
                      onClick={handleToggleCore(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checkedProjectTypeCourse.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={value.CourseCode}
                      />
                    </ListItem>
                  );
                })
              ) : (
                coursesECE.filter((course)=>course.CourseType==="PROJECT").map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value.CourseId}
                      role={undefined}
                      dense
                      button
                      onClick={handleToggleCore(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checkedProjectTypeCourse.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={value.CourseCode}
                      />
                    </ListItem>
                  );
                })
              )
            }
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Electives
          </Typography>
          <List className={classes.root}>
          {
              studentInfo.branch === "IT" ? (
                coursesIT.filter((course)=>course.CourseType==="ELECTIVE").map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value.CourseId}
                      role={undefined}
                      dense
                      button
                      onClick={handleToggleCore(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checkedElective.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={value.CourseCode}
                      />
                    </ListItem>
                  );
                })
              ) : (
                coursesECE.filter((course)=>course.CourseType==="ELECTIVE").map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value.CourseId}
                      role={undefined}
                      dense
                      button
                      onClick={handleToggleCore(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checkedElective.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={value.CourseCode}
                      />
                    </ListItem>
                  );
                })
              )
            }
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
