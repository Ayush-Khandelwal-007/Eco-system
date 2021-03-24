import React, { useEffect, useState } from "react";
import { db, storage } from "../Firebase";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FnADesign from "./FnADashboard.module.css";
import { useHistory } from "react-router-dom";

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

const GoBackBtn = withStyles(() => ({
  root: {
    width: "180px",
    height: "45px",
    color: "#000000",
    background: "#FFCCBC",
    boxShadow: "0px 4px 20px #525CDD",
    borderRadius: "10px",
    letterSpacing: "1.25px",
    "&:hover": {
      backgroundColor: "#070D59",
      color: "#ffffff",
      boxShadow: "none",
    },
  },
}))(Button);

export default function FeeChart() {
  const history = useHistory();
  const [inputPDF, setInputPDF] = useState(null);
  const [progress, setProgress] = useState(0);

  const [ttpdf, setttpdf] = useState(null);
  useEffect(() => {
    storage
      .ref("pdf")
      .child("FeeChart.pdf")
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
    const uploadTask = storage.ref(`pdf/FeeChart.pdf`).put(inputPDF);
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
          .child("FeeChart.pdf")
          .getDownloadURL()
          .then((url) => {
            db.collection("FeeChart").add({
              id: "emergencylink",
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
    <div className={FnADesign.main}>
      <div className={FnADesign.Nav}>
        <div className={FnADesign.HeadingTxt}>Fee Chart</div>
        <GoBackBtn
          variant="contained"
          color="primary"
          onClick={() => {
            history.goBack();
          }}
        >
          Go&nbsp;Back&nbsp;to&nbsp;Menu
        </GoBackBtn>
      </div>
      <div className={FnADesign.timetableMainDiv}>
        <iframe src={ttpdf} className={FnADesign.frame} />
        <div className={FnADesign.inputDiv}>
          <LinearProgressWithLabel value={progress} />
          <div>
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
              Replace
            </Button>
          </div>
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
      </div>
    </div>
  );
}
