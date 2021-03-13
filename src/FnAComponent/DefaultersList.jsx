import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
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
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function DefaultersList() {
    const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Enroll&nbsp;No.</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Batch</StyledTableCell>
            <StyledTableCell align="right">Outstanding&nbsp;Fee</StyledTableCell>
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
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
