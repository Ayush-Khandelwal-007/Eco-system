import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useUser } from "../contexts/User";
import design from "./CoursesComponent/courses.module.css";
import { db } from "../Firebase";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#00887A",
    color: "#DDDDDD",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-child(odd)": {
      backgroundColor: "#FFCCBC",
    },
    "&:nth-child(even)": {
      backgroundColor: "#D3E3FC",
    },
  },
  // root:nth-child(even) {
  //       backgroundColor: "#FFCCBC",
  //     backgroundColor: "#D3E3FC",

  //   },
}))(TableRow);

function createData(Sno, courseId, courseName, courseType, gpa, date) {
  return { Sno, courseId, courseName, courseType, gpa, date };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  container: {
    width: "90%",
    margin: 25,
  },
});

function StudentCourses() {
  const classes = useStyles();
  const [completedCourses, setcompletedCourses] = useState([]);
  const [onGoingCourses, setOnGoingCourses] = useState([]);
  const [state, dispatch] = useUser();
  const [courses, setCourses] = useState([]);

  var emailid = state.user.branch === 'IT' ? ('it@amigo.com') : ('ece@amigo.com')
  useEffect(() => {
    db.collection("HoD")
      .doc(emailid)
      .collection("courses").orderBy("semester", "asc")
      .onSnapshot((querySnapshot) => {
        var list = [];
        var x = 0;
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: x });
          x = x + 1;
        });

        setCourses(list);
      });
  }, [db]);
  useEffect(() => {
    db.collection("Students").doc(state.user.email).collection('completedCourses').get()
      .then((querySnapshot) => {
        var list = []
        querySnapshot.forEach((doc) => {
          list.push(doc.data())
        });

        var newlist = list.map((ele) => {
          return ({
            ...ele,
            course: courses?.find((course) => course.CourseId === ele.courseId)
          })
        });
        setcompletedCourses(newlist);
      })
  }, [db, courses])

  useEffect(() => {
    db.collection("Students").doc(state.user.email).collection('onGoingCourses').get()
      .then((querySnapshot) => {
        var list = []
        querySnapshot.forEach((doc) => {
          list.push(doc.data())
        });

        var newlist = list.map((ele) => {
          return ({
            ...ele,
            course: courses?.find((course) => course.CourseId === ele.courseId)
          })
        });
        setOnGoingCourses(newlist);
      })
  }, [db, courses])

  return (
    <>
      <Typography variant="h4" component="h4" className={design.headingTxt}>
        Ongoing Courses
      </Typography>
      {
        onGoingCourses.length > 0 ? (
          <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Semester</StyledTableCell>
                  <StyledTableCell>Course&nbsp;Id</StyledTableCell>
                  <StyledTableCell>Course&nbsp;Name</StyledTableCell>
                  <StyledTableCell>Course&nbsp;Type</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {onGoingCourses?.map((row, index) => (
                  <StyledTableRow key={row?.course?.courseId}>
                    <StyledTableCell component="th" scope="row">
                      {index}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row?.course?.semester}
                    </StyledTableCell>
                    <StyledTableCell>{row?.course?.CourseId}</StyledTableCell>
                    <StyledTableCell>{row?.course?.CourseCode}</StyledTableCell>
                    <StyledTableCell>{row?.course?.CourseType}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : ('You are not Enrolled to any course right now.')
      }
      <Typography variant="h4" component="h4" className={design.headingTxt}>
        Completed Courses
      </Typography>
      {
        completedCourses.length > 0 ? (
          <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Semester</StyledTableCell>
                  <StyledTableCell>Course&nbsp;Id</StyledTableCell>
                  <StyledTableCell>Course&nbsp;Name</StyledTableCell>
                  <StyledTableCell>Course&nbsp;Type</StyledTableCell>
                  <StyledTableCell align="right">GPA</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {completedCourses?.map((row, index) => (
                  <StyledTableRow key={row?.course?.courseId}>
                    <StyledTableCell component="th" scope="row">
                      {index}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row?.course?.semester}
                    </StyledTableCell>
                    <StyledTableCell>{row?.course?.CourseId}</StyledTableCell>
                    <StyledTableCell>{row?.course?.CourseCode}</StyledTableCell>
                    <StyledTableCell>{row?.course?.CourseType}</StyledTableCell>
                    <StyledTableCell align="right">{row?.GPA}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : ("You have not yet completed any course.")
      }
    </>
  );
}

export default StudentCourses;
