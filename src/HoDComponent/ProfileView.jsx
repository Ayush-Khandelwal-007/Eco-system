import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import design from "./ProfileViewComponent/ProfileView.module.css";
import {db} from "../Firebase"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  Listroot: {
    width: "100%",
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
  inline: {
    display: "inline",
  },
  divider: {
    width: "30ch",
  },
}));

function ProfileView() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [students, setStudents] = React.useState([]);
  const [showStudent,setShowStudent]=React.useState({});


  useEffect(() => {
    db.collection("Students").onSnapshot((querySnapshot) => {
      var list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setStudents(list);
    });
  }, [db])

  //dialog
  const handleClickOpen = (student) => {
    setOpen(true);
    setShowStudent(student)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={design.main}>
      <div className={design.heading}>
        <h1>Profile View</h1>
      </div>



      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Profile</DialogTitle>
        <DialogContent>

        <img src={showStudent?.imageurl} className={design.profileimage}/>
          <div > 
            <div>
              <label>Name:</label>
              <div>{showStudent?.name}</div>
            </div>
            <div>
              <label>Enrollment Number:</label>
              <div>{showStudent?.roll}</div>
            </div>
            <div>
              <label>Semester:</label>
              <div>{showStudent?.semester}</div>
            </div>
            <div>
              <label>Branch:</label>
              <div>{showStudent?.branch}</div>
            </div>
            <div>
              <label>Fees:</label>
              <div>
                <div>Semester Fee:{showStudent?.fees?.semfee}</div>
                <div>Late Fee:{showStudent?.fees?.latefee}</div>
              </div>
            </div>
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>





      <div className={design.ProfileList}>
        <List className={classes.Listroot}>
          {
            students.map((student,index)=>{
              return(
                <>
                  <ListItem alignItems="flex-start" button onClick={()=>handleClickOpen(student)}>
                    <ListItemAvatar>
                      <Avatar alt={student.name} src={student.imageurl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={student.roll.toUpperCase()}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {student.name}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {
                    index===students.length-1 ?(null):(<Divider variant="inset" component="li" className={classes.divider} />)
                  }
                </>
              )
            })
          }
        </List>
      </div>
    </div>
  );
}
export default ProfileView;
