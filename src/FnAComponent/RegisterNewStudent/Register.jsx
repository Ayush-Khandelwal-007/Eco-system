import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import StudentDetailsForm from "./StudentDetailsForm";
import CoursesForm from "./CoursesForm";
import Review from "./Review";
import { db } from "../../Firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  marginer: {
    marginTop: "10px",
  },
}));

const steps = ["Student details", "Courses details", "Review application"];

export default function Register() {
  const [checkedCore, setCheckedCore] = React.useState([]);
  const [
    checkedProjectTypeCourse,
    setCheckedProjectTypeCourse,
  ] = React.useState([]);
  const [checkedElective, setCheckedElective] = React.useState([]);

  const initialInfo = {
    address: "",
    branch: "ECE",
    city: "",
    country: "",
    dob: "1990-01-01",
    feesPaid: false,
    firstName: "",
    lastName: "",
    roll: "",
    state: "",
    zip: "",
  };

  const [studentInfo, setStudentInfo] = React.useState(initialInfo);
  // React.useEffect(() => {
  //   console.log(checkedCore, checkedProjectTypeCourse, checkedElective);
  // })
  const [students, setStudents] = useState([])
  const [error, setError] = useState('')
  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };


  useEffect(() => {
    db.collection("Students")
      .get()
      .then((querySnapshot) => {
        var list = []
        querySnapshot.forEach((doc) => {
          list.push(doc.data().roll)
        });
        setStudents(list);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [db])
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <StudentDetailsForm
            studentInfo={studentInfo}
            setStudentInfo={setStudentInfo}
          />
        );
      case 1:
        return (
          <CoursesForm
            studentInfo={studentInfo}
            setStudentInfo={setStudentInfo}
            checkedCore={checkedCore}
            setCheckedCore={setCheckedCore}
            checkedProjectTypeCourse={checkedProjectTypeCourse}
            setCheckedProjectTypeCourse={setCheckedProjectTypeCourse}
            checkedElective={checkedElective}
            setCheckedElective={setCheckedElective}
          />
        );
      case 2:
        return (
          <Review
            studentInfo={studentInfo}
            checkedCore={checkedCore}
            checkedProjectTypeCourse={checkedProjectTypeCourse}
            checkedElective={checkedElective}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const updateFee = (feesPaid) => {
    if (feesPaid) {
      return {
        due: 0,
        latefee: 0,
        paid: 80000,
        semfee: 80000,
      };
    }
    return {
      due: 80000,
      latefee: 0,
      paid: 0,
      semfee: 80000,
    };
  };

  const history = useHistory();
  const gotoDashboard = () => {
    history.push("/FnADashBoard");
  };
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (students.includes(studentInfo.roll.toUpperCase())) {
      setError('Enrollment Number Alredy registered.')
      setOpenAlert(true);
      return;
    }
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    } else {
      db.collection("Students")
        .doc(`${studentInfo.roll.toLowerCase()}@amigo.com`)
        .set({
          alert: false,
          homeAddress: {
            address: studentInfo.address,
            city: studentInfo.city,
            state: studentInfo.state,
            zip: studentInfo.zip,
            country: studentInfo.country,
          },
          branch: studentInfo.branch,
          email: `${studentInfo.roll.toLowerCase()}@amigo.com`,
          feeStatusAtAdmis: studentInfo.feesPaid,
          feeStatusAtReg: studentInfo.feesPaid,
          fees: updateFee(studentInfo.feesPaid),
          feesApproved: studentInfo.feesPaid,
          name: `${studentInfo.firstName} ${studentInfo.lastName}`,
          password: studentInfo.dob,
          dob: studentInfo.dob,
          roll: studentInfo.roll.toUpperCase(),
          semester: "1",
        });
        checkedCore.map((course)=>course.CourseId).concat(checkedElective.map((course)=>course.CourseId)).concat(checkedProjectTypeCourse.map((course)=>course.CourseId)).forEach((course)=>{
          db.collection("Students").doc(`${studentInfo.roll.toLowerCase()}@amigo.com`).collection('onGoingCourses').add({
            courseId:course,
          });
        });
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setCheckedCore([]);
    setCheckedProjectTypeCourse([]);
    setCheckedElective([]);
  };

  const [filledDetails, setFilledDetails] = React.useState(false);
  const [filledCourse, setFilledCourses] = React.useState(false);

  React.useEffect(() => {
    let k = studentInfo;
    if (
      k.address &&
      k.branch &&
      k.city &&
      k.country &&
      k.dob &&
      k.firstName &&
      k.lastName &&
      k.roll &&
      k.state &&
      k.zip
    ) {
      setFilledDetails(true);
    } else {
      setFilledDetails(false);
    }
    let m = checkedCore;
    if (m.length != 0) {
      setFilledCourses(true);
    } else {
      setFilledCourses(false);
    }
  });

  return (
    <React.Fragment>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="warning">
          {error}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Amigo
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Student Registration
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Student registration successfully completed
                </Typography>
                <Typography variant="subtitle1">
                  Student with enrollment no. {studentInfo.roll.toUpperCase()}{" "}
                  has been successfully registered
                </Typography>
                <Grid container spacing={2} className={classes.marginer}>
                  <Grid item>Email</Grid>
                  <Grid item>{studentInfo.roll.toLowerCase()}@amigo.com</Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item>Password</Grid>
                  <Grid item>{studentInfo.dob}</Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    gotoDashboard();
                    setStudentInfo(initialInfo);
                  }}
                >
                  Next
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep == 0 && (
                    <>
                      <Button
                        onClick={gotoDashboard}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!filledDetails}
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!filledCourse}
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Submit
                      </Button>
                    </>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
