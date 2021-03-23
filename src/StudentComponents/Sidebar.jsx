import React from "react";
import sidebar from "./SidebarComponents/Sidebar.module.css";
import garbage from "../images/garbage.svg";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useUser } from "../contexts/User";

function Sidebar() {
  const location = useLocation();
  const [state, dispatch] = useUser();
  return (
    <div className={sidebar.sidebar}>
      <div className={sidebar.info}>
        <img
          src={state?.user?.imageurl}
          alt="Profile gic"
          className={sidebar.profilepic}
        />
        <div className={sidebar.enroll}>{state?.user?.roll}</div>
        <div className={sidebar.name}>{state?.user?.name}</div>
        <div className={sidebar.sem}>
          {" "}
          Semester - {state?.user?.semester}
          {state?.user?.semester === 1
            ? "st"
            : state?.user?.semester === 2
            ? "nd"
            : state?.user?.semester === 3
            ? "rd"
            : "th"}
        </div>
      </div>
      <div className={sidebar.links}>
        <Link to="/studentDashboard">
          <Button
            className={
              location.pathname === "/studentDashboard" ? sidebar.active : null
            }
          >
            Dashboard
          </Button>
        </Link>
        <Link to="/studentDashboard/fees">
          <Button
            className={
              location.pathname === "/studentDashboard/fees"
                ? sidebar.active
                : null
            }
          >
            Fees
          </Button>
        </Link>
        <Link to="/studentDashboard/timetable">
          <Button
            className={
              location.pathname === "/studentDashboard/timetable"
                ? sidebar.active
                : null
            }
          >
            Timetable
          </Button>
        </Link>
        <Link to="/studentDashboard/courses">
          <Button
            className={
              location.pathname === "/studentDashboard/courses"
                ? sidebar.active
                : null
            }
          >
            Courses
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
