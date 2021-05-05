import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

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

export default function CoursesForm() {
  const classes = useStyles();
  const [branch, setBranch] = React.useState("");

  const handleChange = (event) => {
    setBranch(event.target.value);
  };

  // Courses list
  //Core
  const [checkedCore, setCheckedCore] = React.useState([0]);

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

  //AddOn
  const [checkedAddOn, setCheckedAddOn] = React.useState([0]);

  const handleToggleAddOn = (value) => () => {
    const currentIndex = checkedAddOn.indexOf(value);
    const newChecked = [...checkedAddOn];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedAddOn(newChecked);
  };
  //Elective
  const [checkedElective, setCheckedElective] = React.useState([0]);

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
              value={branch}
              onChange={handleChange}
              label="Branch"
            >
              <MenuItem value={"IT"}>IT</MenuItem>
              <MenuItem value={"ECE"}>ECE</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h7" gutterBottom>
            Core Courses
          </Typography>
          <List className={classes.root}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  key={value}
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
                    primary={`Core Course ${value + 1}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <CommentIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h7" gutterBottom>
            Addons
          </Typography>
          <List className={classes.root}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggleAddOn(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checkedAddOn.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`Addon ${value + 1}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <CommentIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h7" gutterBottom>
            Electives
          </Typography>
          <List className={classes.root}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggleElective(value)}
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
                    primary={`Elective ${value + 1}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <CommentIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
