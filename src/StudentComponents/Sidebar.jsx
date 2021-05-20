import React, { useState } from "react";
import sidebar from "./SidebarComponents/Sidebar.module.css";
import garbage from "../images/garbage.svg";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../contexts/User";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core'
import FileUpload from "./SidebarComponents/FileUpload";
import { db, storage } from '../Firebase';
import add from '../images/add.svg'

function Sidebar() {
  const location = useLocation();
  const [state, dispatch] = useUser();
  const [openAddImageDialog, setOpenAddImageDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [imageSource, setImageSource] = useState(state.user.imageurl)

  const upload = () => {
    setLoading(true);
    const uploadTask = storage.ref(`profileImages/${state.user.roll.toLowerCase()}.jpeg`).put(selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log(`${state.user.roll.toLowerCase()}.jpeg`)
        storage
          .ref("profileImages")
          .child(`${state.user.roll.toLowerCase()}.jpeg`)
          .getDownloadURL()
          .then((url) => {
            db.collection("Students").doc(state.user.email).set({
              imageurl: url
            }, { merge: true });
            setLoading(false);
            setEnabled(false);
            setSelectedFile(null);
            setOpenAddImageDialog(false);
            setImageSource(url);
          });
      }
    );
  }

  return (
    <div className={sidebar.sidebar}>
      <Dialog open={openAddImageDialog}>
        <DialogTitle id="form-dialog-title">Select new Profile Pic</DialogTitle>
        <Divider />
        <DialogContent>
          {
            loading === true ? (<div style={{ width: "60vw" }}>LOADING...</div>) : (
              <FileUpload setSelectedFile={setSelectedFile} setEnabled={setEnabled} selectedFile={selectedFile} enabled={enabled} />
            )
          }

        </DialogContent>
        <Divider />
        <DialogActions>
          <Button disabled={loading} onClick={() => { setOpenAddImageDialog(false) }} color="primary">
            Cancel
                    </Button>
          <Button onClick={() => { upload() }} disabled={(!enabled) || (loading)} color="primary">
            Upload
                    </Button>
        </DialogActions>
      </Dialog>
      <div className={sidebar.info}>
        {
          imageSource ? (
            <>
            <div
              onClick={() => { setOpenAddImageDialog(true) }}
              style={{backgroundImage:`url(${imageSource})`}}
              className={sidebar.profilepic}
            ><img className={sidebar.addIcon} src={add}/></div>
            </>
          ) : (
            <div onClick={() => { setOpenAddImageDialog(true) }} className={sidebar.profilepic}><img src={add}/>Add Image</div>
          )
        }
        <div className={sidebar.enroll}>{state?.user?.roll}</div>
        <div className={sidebar.name}>{state?.user?.name}</div>
        <div className={sidebar.sem}>
          {" "}
          Semester - {state?.user?.semester}
          {state?.user?.semester == 1
            ? "st"
            : state?.user?.semester == 2
              ? "nd"
              : state?.user?.semester == 3
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
