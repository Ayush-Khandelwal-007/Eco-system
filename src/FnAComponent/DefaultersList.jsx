import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FnADesign from './FnADashboard.module.css';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#FFCCBC',
    color: '#000000',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
      backgroundColor: '#fffff',
  },
}))(TableRow);

function createData(Sno, Enrollno, Name, Batch, OutstandingFee, Deadline) {
  return { Sno, Enrollno, Name, Batch, OutstandingFee, Deadline };
}

const rows = [
  createData(1, 'IIT2019229', 'Navneet Bhole', 'Btech 2019', '2₹', '5/13/2021'),
  createData(2, 'IIT2019229', 'Navneet Bhole', 'Btech 2019', '2₹', '5/13/2021'),
  createData(3, 'IIT2019229', 'Navneet Bhole', 'Btech 2019', '2₹', '5/13/2021'),
  createData(3, 'IIT2019229', 'Navneet Bhole', 'Btech 2019', '2₹', '5/13/2021'),
  createData(3, 'IIT2019229', 'Navneet Bhole', 'Btech 2019', '2₹', '5/13/2021'),
  createData(3, 'IIT2019229', 'Navneet Bhole', 'Btech 2019', '2₹', '5/13/2021'),
  createData(3, 'IIT2019229', 'Navneet Bhole', 'Btech 2019', '2₹', '5/13/2021'),
  createData(3, 'IIT2019229', 'Navneet Bhole', 'Btech 2019', '2₹', '5/13/2021'),
  createData(3, 'IIT2019229', 'Navneet Bhole', 'Btech 2019', '2₹', '5/13/2021'),
  createData(3, 'IIT2019229', 'Navneet Bhole', 'Btech 2019', '2₹', '5/13/2021'),
  createData(3, 'IIT2019229', 'Navneet Bhole', 'Btech 2019', '2₹', '5/13/2021'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  container: {
    width: 'auto',
    margin: 25,
  }
});

const GoBackBtn = withStyles(() => ({
    root: {
      width: "180px",
      height: "45px",
      color: "#000000",
      background: "#FFCCBC",
      boxShadow: "0px 4px 20px #525CDD",
      borderRadius: "10px",
      letterSpacing: "1.25px",
      '&:hover': {
        backgroundColor: "#070D59",
        color: '#ffffff',
        boxShadow: 'none'
      },
    },
  }))(Button);

export default function DefaultersList() {
    const classes = useStyles();
    const history = useHistory();

  return (
    <div className={FnADesign.main}>
    <div className={FnADesign.Nav}>
        <div className={FnADesign.HeadingTxt}>
            DEFAULTERS LIST
        </div>
        <GoBackBtn variant="contained" color="primary" onClick={() => {history.goBack();}} >
            Go&nbsp;Back&nbsp;to&nbsp;Menu
        </GoBackBtn>
    </div>
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Enroll&nbsp;No.</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Batch</StyledTableCell>
            <StyledTableCell align="right">Outstanding&nbsp;FEE</StyledTableCell>
            <StyledTableCell align="right">DEADLINE/EXTENSION</StyledTableCell>
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
              <StyledTableCell align="right">{row.OutstandingFee}</StyledTableCell>
              <StyledTableCell align="right">{row.Deadline}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
