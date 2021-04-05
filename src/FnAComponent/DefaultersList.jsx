import React, { useEffect, useState  } from 'react'
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
import {db} from '../Firebase';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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

function createData( Enrollno, Name, Batch, OutstandingFee, Deadline) {
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
      '&:hover': {
        backgroundColor: "#070D59",
        color: '#ffffff',
        boxShadow: 'none'
      },
    },
  }))(Button);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function DefaultersList() {

  const [defaultersList, setDefaultersList] = useState([])
  const [openAlert, setOpenAlert] = useState(false);

  const sendAlert =()=>{
    defaultersList.forEach((item)=>{
      db.collection("Students").doc(item.email).update({
        alert:true
      })
    })
    setOpenAlert(true);
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    db.collection("Students").where("fees.latefee", ">", 0)
    .get()
    .then((querySnapshot) => {
      var list=[]
      querySnapshot.forEach((doc) => {
        list.push( doc.data())
        console.log(doc.id, " => ", doc.data());
      });
      setDefaultersList(list);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  },[db])

    const classes = useStyles();
    const history = useHistory();

  const rows = defaultersList.map((row)=>createData( row.roll, row.name, row.semester, (row.fees.due), '5/13/2021'))

  return (
    <div className={FnADesign.main}>
      {
        console.log(defaultersList)
      }
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
            <StyledTableCell>Semester</StyledTableCell>
            <StyledTableCell align="right">Outstanding&nbsp;FEE</StyledTableCell>
            <StyledTableCell align="right">DEADLINE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index+1}
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
    <div className={FnADesign.Nav}>
        <div className={FnADesign.HeadingTxt}>
            ALERT DEFAULTERS 
        </div>
        <GoBackBtn variant="contained" color="primary" onClick={() => sendAlert()}>
            Send
        </GoBackBtn>
    </div>
    <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Alert sent successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
