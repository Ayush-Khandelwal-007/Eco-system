import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FnADesign from "./FnADashboard.module.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { db } from '../Firebase';

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

function createData(Enrollno, Name, Batch, OutstandingFee, Deadline) {
  return { Enrollno, Name, Batch, OutstandingFee, Deadline };
}

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
    "&:hover": {
      backgroundColor: "#070D59",
      color: "#ffffff",
      boxShadow: "none",
    },
  },
}))(Button);

export default function FeeApproval() {
  const classes = useStyles();
  const history = useHistory();
  const [approvallist, setApprovallist] = useState([]);
  const rows = [];

  const approveFee = (email) => {
    db.collection('Students').doc(email).update({
      feesApproved: true,
    });
    db.collection('feeapproval').doc(email)
      .delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  useEffect(() => {
    db.collection('feeapproval').onSnapshot(snapshot => {
      setApprovallist(snapshot.docs.map((doc) => {
        return {
          data: doc.data().description,
          email: doc.id
        }
      }))
    })
    console.log(approvallist)
  }, [db])

  return (
    <div className={FnADesign.main}>
      <div className={FnADesign.Nav}>
        <div className={FnADesign.HeadingTxt}>FEE APPROVAL</div>
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
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Approve</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approvallist.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.data}</StyledTableCell>
                <StyledTableCell> <div style={{ cursor: 'pointer' }} onClick={() => {
                  approveFee(row.email)
                }} >Approve</div> </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
