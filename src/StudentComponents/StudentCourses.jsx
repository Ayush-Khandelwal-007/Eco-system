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

function createData(Sno, Enrollno, Name, Batch, OutstandingFee, Deadline) {
  return { Sno, Enrollno, Name, Batch, OutstandingFee, Deadline };
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
              <StyledTableCell>Enroll&nbsp;No.</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Batch</StyledTableCell>
              <StyledTableCell align="right">
                Outstanding&nbsp;FEE
              </StyledTableCell>
              <StyledTableCell align="right">
                DEADLINE/EXTENSION
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.Sno}>
                <StyledTableCell component="th" scope="row">
                  {row.Sno}
                </StyledTableCell>
                <StyledTableCell>{row.Enrollno}</StyledTableCell>
                <StyledTableCell>{row.Name}</StyledTableCell>
                <StyledTableCell>{row.Batch}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.OutstandingFee}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Deadline}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StudentCourses;
