import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import "./CoursesComponent/course.css";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import { db } from "../Firebase";
import { useUser } from "../contexts/User";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
    background: "#77A6F7",
  },

  appBar: {
    background: "#070D59",
  },

  paper: {},
  GridContainer: {
    background: "#FFCCBC",
    cursor: "pointer",
    height: "180px",
    "&:hover": {
      backgroundColor: "#D3E3FC",
      boxShadow: "none",
    },
  },
  table: {
    width: "100vw",
  },
  createBtn: {
    background: "#35b056",
    color: "#fff",
    marginBottom: "25px",
    "&:hover": {
      background: "#3ac728",
    },
  },
  formControl: {
    width: "100%",
  },
  DailogContentRoot: {
    width: 270,
  },
  updateBtn: {
    marginRight: 10,
  },
  snackbarDiv: {
    backgroundColor: "red !important",
    color: "white !important",
    "&>div": {
      color: "white !important"
    }
  }
}));


let COURSES = [
  {
    CourseId: "test-AX101",
    CourseCode: "test-PPL",
    CourseType: "test-CORE",
    Credits: "test-1",
    courseCO: "teacher-1",
    // description: "Create an example of how to use the component",
  },
  {
    CourseId: "test-PBJ21",
    CourseCode: "test-NOB",
    CourseType: "test-ADD-ON",
    Credits: "test-3",
    courseCO: "teacher-2",
    // description: "Improve the component!",
  },
];


const styles = {
  container: { margin: "auto", width: "fit-content" },
};

function Courses() {
  const [state, dispatch] = useUser();
  const history = useHistory();
  const classes = useStyles();
  const [teachers, setTeachers] = React.useState([]);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState('')

  const createNewCourse = (e) => {
    e.preventDefault();
    if (courses.filter((course) => course.CourseId === courseId).length > 0) {
      setError('This Id is already in use , Please choose another ID.')
      setOpenSnack(true);
      return
    }
    db.collection("HoD")
      .doc(state.user.email)
      .collection("courses")
      .doc(courseId)
      .set({
        CourseId: courseId,
        CourseCode: courseCode,
        CourseType: courseType,
        Credits: courseCredit,
        courseCO: courseCord,
        semester:courseSem,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  const service = {
    update: (data) => {
      console.log(data);
      var id;
      teachers.forEach((teacher) => {
        if (data.courseCO === teacher.name) {
          id = teacher.id;
        }
      });

      db.collection("HoD")
        .doc(state.user.email)
        .collection("courses")
        .doc(data.CourseId)
        .update({
          CourseId: data.CourseId,
          CourseCode: data.CourseCode,
          CourseType: data.CourseType,
          Credits: data.Credits,
          courseCO: id,
        });

      return Promise.resolve(data);
    },
    delete: (data) => {
      db.collection("HoD")
        .doc(state.user.email)
        .collection("courses")
        .doc(data.CourseId)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });

      return Promise.resolve(data);
    },
  };
  useEffect(() => {
    db.collection("teachers").onSnapshot((querySnapshot) => {
      var list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setTeachers(list);
      console.log(teachers);
    });
  }, [db]);

  useEffect(() => {
    db.collection("HoD")
      .doc(state.user.email)
      .collection("courses").orderBy("semester","asc")
      .onSnapshot((querySnapshot) => {
        var list = [];
        var x = 0;
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: x });
          x = x + 1;
        });

        var newlist = list.map((ele) => {
          var name;
          teachers.forEach((teacher) => {
            if (ele.courseCO === teacher.id) {
              name = teacher.name;
            }
          });
          return {
            ...ele,
            courseCO: name,
          };
        });

        console.log(teachers);

        setCourses(newlist);
      });
  }, [db, teachers]);

  //Create Course Dailog
  const [openCreateDailog, setOpenCreateDailog] = React.useState(false);

  const handleClickOpenCreateDailog = () => {
    setOpenCreateDailog(true);
  };

  const handleCloseCreateDailog = () => {
    setOpenCreateDailog(false);
  };

  const [courseType, setCourseType] = React.useState("CORE");
  const [courseCord, setCourseCord] = React.useState("");

  const handleChangeCourseType = (e) => {
    setCourseType(e.target.value);
  };

  const handleChangeCourseCord = (e) => {
    setCourseCord(e.target.value);
  };

  const [courseCredit, setCourseCredit] = React.useState(4);

  const handleChangeCourseCredit = (e) => {
    setCourseCredit(e.target.value);
  };

  const [courseSem, setCourseSem] = React.useState(1);

  const handleChangeCourseSem = (e) => {
    setCourseSem(e.target.value);
  };

  //Update Course
  const [openUpdateDailog, setOpenUpdateDailog] = React.useState(false);
  const handleClickOpenUpdateDailog = () => {
    setOpenUpdateDailog(true);
  };

  const handleCloseUpdateDailog = () => {
    setOpenUpdateDailog(false);
  };

  //Delete Course
  const [openDeleteDailog, setOpenDeleteDialog] = React.useState(false);
  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDailog = () => {
    setOpenDeleteDialog(false);
  };

  const disableCreate = courseId === '' || courseCode === '' || courseCord === ''

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div style={classes.container}>
      <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert className={classes.snackbarDiv} severity="error">
          <strong>{error}</strong>
        </Alert>
      </Snackbar>
      <Dialog
        open={openCreateDailog}
        onClose={handleCloseCreateDailog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Course Creation</DialogTitle>
        <DialogContent className={classes.DailogContentRoot}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={courseId}
                onChange={e => setCourseId(e.target.value)}
                id="outlined-basic"
                label="Course ID"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={courseCode}
                onChange={e => setCourseCode(e.target.value)}
                id="outlined-basic"
                label="Course Code"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  required
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Course Coordinator
                </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={courseCord}
                    onChange={handleChangeCourseCord}
                    label="Course Coordinator"
                  >
                    {
                      teachers.map((teacher) => <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                required
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Semester
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={courseSem}
                  onChange={handleChangeCourseSem}
                  label="Semester"
                >
                  {
                    semesters.map(sem => <MenuItem key={sem} value={sem}>{sem}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                required
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Course Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={courseType}
                  onChange={handleChangeCourseType}
                  label="Course Type"
                >
                  <MenuItem value={"CORE"}>Core</MenuItem>
                  <MenuItem value={"PROJECT"}>Project Type</MenuItem>
                  <MenuItem value={"ELECTIVE"}>Elective</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                required
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Credits
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={courseCredit}
                  onChange={handleChangeCourseCredit}
                  label="Credite"
                >
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDailog} color="primary">
            Cancel
          </Button>
          <Button disabled={disableCreate} onClick={createNewCourse} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update dialog */}

      <Dialog
        open={openUpdateDailog}
        onClose={handleCloseUpdateDailog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Course Update</DialogTitle>
        <DialogContent className={classes.DailogContentRoot}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Course ID"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Course Code"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                required
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Course Coordinator
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={courseType}
                  onChange={handleChangeCourseType}
                  label="Course Coordinator"
                >
                  <MenuItem value={"Core"}>Core</MenuItem>
                  <MenuItem value={"Elective"}>Elective</MenuItem>
                  <MenuItem value={"ProjectType"}>Project Type</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                required
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Course Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={courseType}
                  onChange={handleChangeCourseType}
                  label="Course Type"
                >
                  <MenuItem value={"Core"}>Core</MenuItem>
                  <MenuItem value={"AddOn"}>Add ON</MenuItem>
                  <MenuItem value={"Elective"}>Elective</MenuItem>
                  <MenuItem value={"ProjectType"}>Project Type</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                required
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Credits
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={courseCredit}
                  onChange={handleChangeCourseCredit}
                  label="Course Type"
                >
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"4"}>4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDailog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseUpdateDailog} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete dialog */}

      <Dialog
        open={openDeleteDailog}
        onClose={handleCloseDeleteDailog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Course Delete</DialogTitle>
        <DialogContent>
          Are you sure, you want to delete this course ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDailog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDeleteDailog} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        className={classes.createBtn}
        onClick={handleClickOpenCreateDailog}
      >
        Create Course
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Course Semester</StyledTableCell>
              <StyledTableCell align="center">Course ID</StyledTableCell>
              <StyledTableCell align="left">Course Code</StyledTableCell>
              <StyledTableCell align="center">Course Type</StyledTableCell>
              <StyledTableCell align="center">
                Credits
              </StyledTableCell>
              <StyledTableCell align="center">Course Coordinator</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((row) => (
              <StyledTableRow key={row.CourseId}>
                <StyledTableCell component="th" scope="row"  align="center">{row.semester}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.CourseId}
                </StyledTableCell>
                <StyledTableCell align="left">{row.CourseCode}</StyledTableCell>
                <StyledTableCell align="center">{row.CourseType}</StyledTableCell>
                <StyledTableCell align="center">{row.Credits}</StyledTableCell>
                <StyledTableCell align="center">{row.courseCO}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpenUpdateDailog}
                    className={classes.updateBtn}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpenDeleteDialog}
                  >
                    Delete
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
Courses.propTypes = {};

export default Courses;
