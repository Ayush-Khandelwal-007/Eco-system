import React from "react";
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

let courses = [
  {
    id: 1,
    CourseId: "AX101",
    CourseCode: "PPL",
    CourseType: "CORE",
    Credits: "4",
    // description: "Create an example of how to use the component",
  },
  {
    id: 2,
    CourseId: "PBJ21",
    CourseCode: "NOB",
    CourseType: "ADD-ON",
    Credits: "2",
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

let count = courses.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(courses);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (course) => {
    count += 1;
    courses.push({
      ...course,
      id: count,
    });
    return Promise.resolve(course);
  },
  update: (data) => {
    const course = courses.find((t) => t.id === data.id);
    course.CourseId = data.CourseId;
    course.CourseCode = data.CourseCode;
    course.CourseType = data.CourseType;
    course.Credits = data.Credits;
    return Promise.resolve(course);
  },
  delete: (data) => {
    const course = courses.find((t) => t.id === data.id);
    courses = courses.filter((t) => t.id !== course.id);
    return Promise.resolve(course);
  },
};

const styles = {
  container: { margin: "auto", width: "fit-content" },
};

function Courses() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Courses"
        fetchItems={(payload) => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="id" label="Id" hideInCreateForm />
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

            if (!values.id) {
              errors.id = "Please, provide id";
            }

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
            if (!values.id) {
              errors.id = "Please, provide id";
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
