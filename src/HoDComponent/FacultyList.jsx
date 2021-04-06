import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Faculty from "./FacultyListComponent/Faculty.module.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useUser } from "../contexts/User";
import { db } from "../Firebase";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#FFCCBC",
    color: "#000000",
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  container: {
    width: "100%",
    margin: 25,
  },
});

function createData(Name) {
  return { Name };
}

const rows1 = [
  createData("Triloki Pant"),
  createData("Anand Kumar Tiwari"),
  createData("Anjali Gautam"),
];

const rows2 = [
  createData("Praveen Kumar"),
  createData("Sumita Das"),
  createData("Jaspreet Singh"),
];

//dailog

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function FacultyList() {
  const [state, dispatch] = useUser();
  const history = useHistory();
  const classes = useStyles();

  const [teacherId, setTeacherId] = React.useState("");
  const [courseId, setCourseId] = React.useState("");

  //dailog
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpenAdd = (id) => {
    setTeacherId(id);
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const [openDelete, setopenDelete] = React.useState(false);

  const handleClickOpenDelete = (id) => {
    setCourseId(id);
    setopenDelete(true);
  };
  const handleCloseDelete = () => {
    setopenDelete(false);
  };

  const handleAddToList = () => {
    db.collection("HoD").doc(state.user.email).collection("assignedTeachers").doc().set({
      teacherId: teacherId,
      courseId: value,
    })
    setOpenAdd(false);
  }

  const handleDeleteAssignment = () => {
    db.collection("HoD").doc(state.user.email).collection("assignedTeachers").doc(courseId).delete().then(() => {
      setopenDelete(false);
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

  }

  const [value, setValue] = React.useState('');
  const [courses, setCourses] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [assignedteachers, setAssignedteachers] = React.useState([]);

  React.useEffect(() => {
    db.collection("HoD").doc(state.user.email).collection("courses")
      .onSnapshot((querySnapshot) => {
        var list = []
        var x = 0;
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: x });
          x = x + 1;
        });
        setCourses(list);
      })
  }, [db])

  React.useEffect(() => {
    db.collection("HoD").doc(state.user.email).collection("assignedTeachers")
      .onSnapshot((querySnapshot) => {
        var list = []
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setAssignedteachers(list);
      })
  }, [db])

  React.useEffect(() => {
    db.collection("teachers")
      .onSnapshot((querySnapshot) => {
        var list = []
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setTeachers(list);
      })
  }, [db])

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const assignedteachersinfo = assignedteachers.map((doc) => {
    return ({
      id: doc.id,
      teacher: teachers.find((teacher) => teacher.id === doc.teacherId),
      course: courses.find((course) => course.CourseId === doc.courseId)
    })
  })

  return (
    <div className={Faculty.main}>
      {/* dailog */}
      <Dialog
        onClose={handleCloseAdd}
        aria-labelledby="customized-dialog-title"
        open={openAdd}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseAdd}>
          Select The Course&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <FormControl component="fieldset">
              <FormLabel component="legend">Courses</FormLabel>
              <RadioGroup aria-label="Course" value={value} onChange={handleChange}>
                {
                  courses?.map((course) => {
                    return (<FormControlLabel key={course.CourseId} value={course.CourseId} control={<Radio />} label={course.CourseCode} />)
                  })
                }
              </RadioGroup>
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddToList} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dailog */}
      <Dialog
        onClose={handleCloseDelete}
        aria-labelledby="customized-dialog-title"
        open={openDelete}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseDelete}>
          Confirm Delete
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Are you sure you want to delete?</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDelete} color="primary">
            No
          </Button>
          <Button autoFocus onClick={handleDeleteAssignment} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* dialog */}

      <TableContainer component={Paper} className={classes.container}>
        <h1>LIST OF ALL THE TEACHERS ASSIGNED TO A COURSE</h1>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Faculty&nbsp;Name</StyledTableCell>
              <StyledTableCell>Course ID</StyledTableCell>
              <StyledTableCell align="right">REMOVE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignedteachersinfo.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{row?.teacher?.name}</StyledTableCell>
                <StyledTableCell>{row?.course?.CourseId}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleClickOpenDelete(row.id)}
                  >
                    <DeleteForeverTwoToneIcon
                      style={{
                        color: "red"
                      }}
                    />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={classes.container}>
        <h1>LIST OF ALL THE TEACHERS</h1>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Faculty&nbsp;Name</StyledTableCell>
              <StyledTableCell align="right">ASSIGN TO A COURSE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{teacher.name}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    onClick={() => handleClickOpenAdd(teacher.id)}
                  >
                    <AddRoundedIcon
                      style={{
                        color: "green"
                      }}
                    />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default FacultyList;
