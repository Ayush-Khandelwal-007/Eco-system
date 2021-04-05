import React from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import design from "./hod.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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
}));

function Courses() {
  const history = useHistory();
  const classes = useStyles();

  return <> Hi</>;
}
export default Courses;
