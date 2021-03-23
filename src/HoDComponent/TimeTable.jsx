import React, { useEffect, useState } from "react";
import { db, storage } from "../Firebase";
import timetable from "./hod.module.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box width="70%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
function TimeTable() {
  const [inputPDF, setInputPDF] = useState(null);
  const [progress, setProgress] = useState(0);

  const [ttpdf, setttpdf] = useState(null);
  useEffect(() => {
    storage
      .ref("pdf")
      .child("TimeTable.pdf")
      .getDownloadURL()
      .then((url) => {
        setttpdf(url);
      });
  });

  const Upload = () => {
    if (inputPDF) {
      UploadPost();
    }
  };

  const UploadPost = () => {
    const uploadTask = storage.ref(`pdf/TimeTable.pdf`).put(inputPDF);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("pdf")
          .child("TimeTable.pdf")
          .getDownloadURL()
          .then((url) => {
            db.collection("TimeTable").add({
              url: url,
            });
            setProgress(0);
            setInputPDF(null);
          });
      }
    );
    setOpenAlert(true);
  };

  //Alert

  const [openAlert, setOpenAlert] = useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  //Alert on sending notifications
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <div className={timetable.timetableMainDiv}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <iframe src={ttpdf} className={timetable.frame} />
        </Grid>
        <Grid item xs={12} sm container>
          <div className={timetable.inputDiv}>
            <LinearProgressWithLabel value={progress} />
            <input
              type="file"
              id="contained-button-file"
              onChange={(e) => {
                if (e.target.files[0]) setInputPDF(e.target.files[0]);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={Upload}
            >
              Upload
            </Button>
            <Snackbar
              open={openAlert}
              autoHideDuration={3000}
              onClose={handleCloseAlert}
            >
              <Alert onClose={handleCloseAlert} severity="success">
                TimeTable uploaded successfully!
              </Alert>
            </Snackbar>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default TimeTable;
