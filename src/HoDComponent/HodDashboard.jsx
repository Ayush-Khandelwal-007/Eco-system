import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import Slide from "@material-ui/core/Slide";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import {
  calender,
  facultyList,
  exam,
  courseUpdate,
  courseAllotment,
  Hod,
  notice,
} from "../images";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  TextField,
} from "@material-ui/core";
import { db } from "../Firebase";
import HoDNav from "./HoDNav";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appBar: {
    background: "#070D59",
  },

  paper: {
    background: "#FFCCBC",
    cursor: "pointer",
    height: "180px",
    "&:hover": {
      backgroundColor: "#D3E3FC",
      boxShadow: "none",
    },
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function HodDashboard(props) {
  const history = useHistory();

  const [title, setTitle] = React.useState("");
  const [startdate, setstartdate] = React.useState(null);
  const [enddate, setenddate] = React.useState(null);
  const classes = useStyles();

  const handlesubmitevent = (event) => {
    event.preventDefault();
    db.collection("calendar").add({
      title: title,
      start: startdate,
      end: enddate,
      display: "background",
    });
    setOpen(false);
    setTitle("");
    setstartdate(null);
    setenddate(null);
    console.log({
      title: title,
      title: startdate,
      end: enddate,
      display: "background",
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.grow}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            *The End Date would not be included in the event.
          </DialogContentText>
          <form>
            <label>
              <div>Event Title</div>
              <TextField
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </label>
            <label>
              <div>Start Date</div>
              <Input
                type="date"
                value={startdate}
                onChange={(e) => {
                  setstartdate(e.target.value);
                }}
              />
            </label>
            <label>
              <div>End Date</div>
              <Input
                type="date"
                value={enddate}
                onChange={(e) => {
                  setenddate(e.target.value);
                }}
              />
            </label>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlesubmitevent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <HoDNav />
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <img src={Hod} alt="" />
        <Typography variant="h5" noWrap>
          Welcome, Sir
        </Typography>
        <Typography variant="h7">
          Manage academic calender, course allotment, exam schedule and more
        </Typography>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Grid container onClick={handleClickOpen}>
                <Grid item xs={12} sm container>
                  <Typography gutterBottom variant="subtitle1">
                    Add Event
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonBase>
                    <img alt="complex" src={calender} />
                  </ButtonBase>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={12} sm container>
                  <Typography gutterBottom variant="subtitle1">
                    Faculty List Management
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonBase>
                    <img alt="complex" src={facultyList} />
                  </ButtonBase>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={12} sm container>
                  <Typography gutterBottom variant="subtitle1">
                    Course Allotment
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonBase>
                    <img alt="complex" src={courseAllotment} />
                  </ButtonBase>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={12} sm container>
                  <Typography gutterBottom variant="subtitle1">
                    Exam Schedule
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonBase>
                    <img alt="complex" src={exam} />
                  </ButtonBase>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={12} sm container>
                  <Typography gutterBottom variant="subtitle1">
                    Notice Board
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonBase>
                    <img alt="complex" src={notice} />
                  </ButtonBase>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={12} sm container>
                  <Typography gutterBottom variant="subtitle1">
                    Course Updation
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonBase>
                    <img alt="complex" src={courseUpdate} />
                  </ButtonBase>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
}

export default HodDashboard;
