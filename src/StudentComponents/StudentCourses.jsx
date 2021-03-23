import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

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
    backgroundColor: "#fffff",
  },
}))(TableRow);

function createData(Sno, courseId, courseName, courseType, gpa, date) {
  return { Sno, courseId, courseName, courseType, gpa, date };
}

const rows = [
  createData(1, "IIT2019229", "Navneet Bhole", "Btech 2019", "2₹", "5/13/2021"),
  createData(2, "IIT2019229", "Navneet Bhole", "Btech 2019", "2₹", "5/13/2021"),
  createData(3, "IIT2019229", "Navneet Bhole", "Btech 2019", "2₹", "5/13/2021"),
  createData(3, "IIT2019229", "Navneet Bhole", "Btech 2019", "2₹", "5/13/2021"),
  createData(3, "IIT2019229", "Navneet Bhole", "Btech 2019", "2₹", "5/13/2021"),
  createData(3, "IIT2019229", "Navneet Bhole", "Btech 2019", "2₹", "5/13/2021"),
  createData(3, "IIT2019229", "Navneet Bhole", "Btech 2019", "2₹", "5/13/2021"),
  createData(3, "IIT2019229", "Navneet Bhole", "Btech 2019", "2₹", "5/13/2021"),
  createData(3, "IIT2019229", "Navneet Bhole", "Btech 2019", "2₹", "5/13/2021"),
  createData(3, "IIT2019229", "Navneet Bhole", "Btech 2019", "2₹", "5/13/2021"),
  createData(3, "IIT2019229", "Navneet Bhole", "Btech 2019", "2₹", "5/13/2021"),
];

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
            {rows.map((row) => (
              <StyledTableRow key={row.Sno}>
                <StyledTableCell component="th" scope="row">
                  {row.Sno}
                </StyledTableCell>
                <StyledTableCell>{row.courseId}</StyledTableCell>
                <StyledTableCell>{row.courseName}</StyledTableCell>
                <StyledTableCell>{row.courseType}</StyledTableCell>
                <StyledTableCell align="right">{row.gpa}</StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StudentCourses;
