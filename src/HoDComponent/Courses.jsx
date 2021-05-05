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
    minWidth: 700,
  },
  createBtn: {
    background: "#35b056",
    color: "#fff",
    "&:hover": {
      background: "#3ac728",
    },
  },
  formControl: {
    width: "100%",
  },
}));

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

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

const SORTERS = {
  NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = (x) => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

const styles = {
  container: { margin: "auto", width: "fit-content" },
};

function Courses() {
  const [state, dispatch] = useUser();
  const history = useHistory();
  const classes = useStyles();
  const [teachers, setTeachers] = React.useState([]);
  const [courses, setCourses] = useState([]);

  let count = courses.length;
  const service = {
    fetchItems: (payload) => {
      let result = Array.from(courses);
      result = result.sort(getSorter(payload.sort));
      return Promise.resolve(result);
    },
    create: (course) => {
      db.collection("HoD")
        .doc(state.user.email)
        .collection("courses")
        .doc(course.CourseId)
        .set(course)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      return Promise.resolve(course);
    },
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
      .collection("courses")
      .onSnapshot((querySnapshot) => {
        var list = [];
        var x = 0;
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: x });
          x = x + 1;
        });

        var newlist = list.map((ele) => {
          var name;
          console.log(teachers);
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

  const [courseType, setCourseType] = React.useState("");

  const handleChangeCourseType = (e) => {
    setCourseType(e.target.value);
  };

  const [courseCredit, setCourseCredit] = React.useState("");

  const handleChangeCourseCredit = (e) => {
    setCourseCredit(e.target.value);
  };

  return (
    <div style={styles.container}>
      {/* <CRUDTable
        caption="Courses"
        items={courses}
      >
        <Fields>
          <Field name="CourseId" label="Course ID" placeholder="Course ID" />
          <Field
            name="CourseCode"
            label="Course Code"
            placeholder="Course Code"
          />
          <Field
            name="CourseType"
            label="Course Type"
            placeholder="Course Type"
          />
          <Field
            name="courseCO"
            label="Course Coordinator"
            placeholder="Course Coordinator"
          />
          <Field name="Credits" label="Credits" placeholder="Credits" />
        </Fields>
        <CreateForm
          title="Course Creation"
          message="Create a new Course!"
          trigger="Create Course"
          onSubmit={(course) => service.create(course)}
          submitText="Create"
          validate={(values) => {
            const errors = {};
            if (!values.CourseId) {
              errors.CourseId = "Please, provide Course ID";
            }

            if (!values.CourseType) {
              errors.CourseType = "Please, provide Course Type";
            }
            if (!values.courseCO) {
              errors.courseCO = "Please, provide Course Coordinator";
            }
            return errors;
          }}
        />

        <UpdateForm
          title="Course Update Process"
          message="Update Course"
          trigger="Update"
          onSubmit={(course) => service.update(course)}
          submitText="Update"
          validate={(values) => {
            const errors = {};

            if (!values.CourseId) {
              errors.CourseId = "Please, provide Course ID";
            }

            if (!values.CourseType) {
              errors.CourseType = "Please, provide Course Type";
            }
            if (!values.courseCO) {
              errors.courseCO = "Please, provide Course Coordinator";
            }

            return errors;
          }}
        />

        <DeleteForm
          title="Course Delete Process"
          message="Are you sure you want to delete the Course?"
          trigger="Delete"
          onSubmit={(course) => service.delete(course)}
          submitText="Delete"
          validate={(values) => {
            const errors = {};
            if (!values.CourseId) {
              errors.CourseId = "Please, provide Course ID";
            }
            return errors;
          }}
        />
      </CRUDTable> */}
      <Dialog
        open={openCreateDailog}
        onClose={handleCloseCreateDailog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Course Creation</DialogTitle>
        <DialogContent>
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
              <TextField
                id="outlined-basic"
                label="Course Coordinator"
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
                  Branch
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
          <Button onClick={handleCloseCreateDailog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseCreateDailog} color="primary">
            Subscribe
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
              <StyledTableCell align="center">Course ID</StyledTableCell>
              <StyledTableCell align="center">Course Code</StyledTableCell>
              <StyledTableCell align="center">Course Type</StyledTableCell>
              <StyledTableCell align="center">
                Course Coordinator
              </StyledTableCell>
              <StyledTableCell align="center">Credits</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.calories}</StyledTableCell>
                <StyledTableCell align="center">{row.fat}</StyledTableCell>
                <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                <StyledTableCell align="center">{row.protein}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="contained" color="primary">
                    Update
                  </Button>
                  <Button variant="contained" color="secondary">
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
