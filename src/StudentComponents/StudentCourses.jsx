import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useUser } from "../contexts/User";

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
  const [state, dispatch] = useUser();

  return (
    <>
      {" "}
      Courses
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Course&nbsp;Id</StyledTableCell>
              <StyledTableCell>Course&nbsp;Name</StyledTableCell>
              <StyledTableCell>Course&nbsp;Type</StyledTableCell>
              <StyledTableCell align="right">GPA</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state?.user?.courses?.map((course) => (
              <StyledTableRow key={course.Sno}>
                <StyledTableCell component="th" scope="row">
                  {course.Sno}
                </StyledTableCell>
                <StyledTableCell>{course.courseId}</StyledTableCell>
                <StyledTableCell>{course.courseName}</StyledTableCell>
                <StyledTableCell>{course.courseType}</StyledTableCell>
                <StyledTableCell align="right">{course.gpa}</StyledTableCell>
                <StyledTableCell align="right">{course.date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StudentCourses;
