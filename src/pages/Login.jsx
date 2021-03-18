import React, { useState, useEffect, useContext } from "react";
import LoginCss from "../StudentComponents/LoginComponent/Login.module.css";
import TextField from "@material-ui/core/TextField";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import logo from "../images/logo.svg";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Fade from "@material-ui/core/Fade";
import Alert from "@material-ui/lab/Alert";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../Firebase";

const LoginButton = withStyles(() => ({
  root: {
    width: "60%",
    color: "#fff",
    backgroundColor: "#27AE60",
    letterSpacing: "1.25px",
    "&:hover": {
      backgroundColor: "#219653",
    },
  },
}))(Button);

const ResetPassButton = withStyles(() => ({
  root: {
    width: "60%",
    color: "#fff",
    backgroundColor: "#333333",
    letterSpacing: "1.25px",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: "#222831",
    },
  },
}))(Button);

const LoginInput = withStyles(() => ({
  root: {
    width: "60%",
    color: "#070D59 !important",
    fontSize: "10px",
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "60%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Login() {
  // const { user, setUser } = useContext();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [invalidAlert, setInvalidAlert] = useState(false);

  const classes = useStyles();

  //Login form Transition
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((prev) => !prev);
  };
  useEffect(() => {
    handleShow();
  }, []);

  //handlelogin
  const [loginType, setLoginType] = useState(null);

  const handleChange = (event) => {
    setLoginType(event.target.value);
  };
  const history = useHistory();

  const goTo = async () => {
    // const user = await master();
    // setUser(user);

    // const userType = () => {
    //   switch (loginType) {
    //     case 1:
    //       return "Students";
    //       break;
    //     case 2:
    //       return "FnA";
    //       break;
    //     case 3:
    //       return "HoD";
    //       break;
    //     default:
    //       return null;
    //   }
    // };
    let userType;

    switch (loginType) {
      case 1:
        userType = "Students";
        break;
      case 2:
        userType = "FnA";
        break;
      case 3:
        userType = "HoD";
        break;
      default:
        return null;
    }
    console.log(userType);

    // db.collection("users")
    //   .doc("FnA")
    //   .get()
    //   .then((doc) => {
    //     console.log(doc.data());
    //   });

    // db.collection("users")
    //   .doc(userType)
    //   .onSnapshot((doc) => {
    //     console.log("Current data: ", doc.data());
    //   });

    // working but have to create extra collection
    var workingPass;

    if (userType == "Students") {
      var docRef = db
        .collection("users")
        .doc(userType)
        .collection(username)
        .doc(username);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data().password);
            workingPass = doc.data().password;
            console.log("working pass", workingPass);
            console.log("your pass", password);
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
    // var UserRef = db.collection("users").doc(userType).collection(username);

    // UserRef.get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       console.log(
    //         "Document data:",
    //         UserRef.doc(username).get().doc.data().name
    //       );
    //       console.log("Document data:", doc.data().name);
    //     } else {
    //       console.log("No such document!");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log("Error getting document:", error);
    //   });

    // var docRef = db.collection("users").doc(userType).id();

    // docRef
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       console.log("Document data:", doc.data().name);
    //     } else {
    //       console.log("No such document!");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log("Error getting document:", error);
    //   });

    // db.collection("users")
    //   .doc(userType)
    //   .collection("iit2019198@amigo.com")
    //   .onSnapshot((doc) => {
    //     console.log("Current data: ", doc.id());
    //   });

    // console.log("user is", { user });
    switch (loginType) {
      case 1:
        if (password.toString() == 123) {
          console.log("pass matching");
          history.push("/studentDashboard");
        } else {
          setInvalidAlert(true);
        }
        break;
      case 2:
        history.push("/FnADashBoard");
        break;
      case 3:
        history.push("/HODDashboard");
        break;
      default:
        return null;
    }
  };

  return (
    <div className={LoginCss.Login}>
      <Fade in={show}>
        <div className={LoginCss.LoginForm}>
          <div className={LoginCss.LogoDiv}>
            <img src={logo} alt="logo" />
          </div>
          {invalidAlert ? (
            <Alert className={LoginCss.InvalidAlert} severity="error">
              Invalid id/password
            </Alert>
          ) : null}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Login Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={loginType}
              onChange={handleChange}
            >
              <MenuItem value={1}>Student</MenuItem>
              <MenuItem value={2}>Fee and Administration</MenuItem>
              <MenuItem value={3}>Head of Department</MenuItem>
            </Select>
          </FormControl>
          <LoginInput
            required
            id="standard-required"
            label="Username"
            onChange={(e) => setusername(e.target.value)}
          />
          <LoginInput
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <LoginButton variant="contained" color="primary" onClick={goTo}>
            LOGIN
          </LoginButton>
          <ResetPassButton variant="contained" color="secondary">
            Reset Password
          </ResetPassButton>
        </div>
      </Fade>
    </div>
  );
}

export default Login;
