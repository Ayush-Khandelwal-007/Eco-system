import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import "./CoursesComponent/course.css";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";

import {db} from '../Firebase';
import { useUser } from "../contexts/User";

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
}));

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let COURSES = [
  {
    CourseId: "test-AX101",
    CourseCode: "test-PPL",
    CourseType: "test-CORE",
    Credits: "test-1",
    // description: "Create an example of how to use the component",
  },
  {
    CourseId: "test-PBJ21",
    CourseCode: "test-NOB",
    CourseType: "test-ADD-ON",
    Credits: "test-3",
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

  const [courses, setCourses] = useState([])


  let count = courses.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(courses);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (course) => {
    db.collection("HoD").doc(state.user.email).collection("courses").doc(course.CourseId).set(course)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    return Promise.resolve(course);
  },
  update: (data) => {
    console.log(data)    

    db.collection("HoD").doc(state.user.email).collection("courses").doc(data.CourseId).update({
      CourseId: data.CourseId,
      CourseCode: data.CourseCode,
      CourseType: data.CourseType,
      Credits: data.Credits,
    })

    return Promise.resolve(data);
  },
  delete: (data) => {
      db.collection("HoD").doc(state.user.email).collection("courses").doc(data.CourseId).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    
    return Promise.resolve(data);
  },
};


  useEffect(() => {
    db.collection("HoD").doc(state.user.email).collection("courses")
    .onSnapshot((querySnapshot) => {
      var list=[]
      var x=0;
      querySnapshot.forEach((doc) => {
        list.push( {...doc.data(),id:x});
        x=x+1;
      });
      setCourses(list);
    })
  }, [db])

  return (
    <div style={styles.container}>
      <CRUDTable
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
      </CRUDTable>
    </div>
  );
}
Courses.propTypes = {};

export default Courses;
