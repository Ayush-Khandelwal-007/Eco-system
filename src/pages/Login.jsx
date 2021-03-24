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
import { db } from "../Firebase";
import { useUser } from "../contexts/User";

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
  const [state, dispatch] = useUser();
  // const { user, setUser } = useContext();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [invalidAlert, setInvalidAlert] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const path = (type) => {
    if (type === "Students") return "studentDashboard";
    if (type === "FnA") return "FnADashBoard";
    if (type === "HoD") return "HODDashBoard";
  };

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
  const [loginType, setLoginType] = useState(1);

  const handleChange = (event) => {
    setLoginType(event.target.value);
  };
  const history = useHistory();

  const goTo = async () => {
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
    // console.log(userType);

    // working but have to create extra collection
    try {
      var docRef = db.collection("users").doc(userType).collection(username);
      var alldata = await docRef.get();
      alldata.forEach((doc) => {
        if (doc.data()) {
          if (doc.data().password === password) {
            dispatch({
              type: "SET_USER",
              user: { ...doc.data() },
              userType: loginType,
            });

            localStorage.setItem('logintype', loginType.toString);
            localStorage.setItem('state', JSON.stringify(doc.data()));
            history.push(`/${path(userType)}`);
          } else {
            setAlertMessage(`Password don't match.`);
            setInvalidAlert(true);
          }
        } else {
          console.log(doc.data());
          setAlertMessage(`No Profile with this username exists.`);
          setInvalidAlert(true);
        }
      });
    } catch (error) {
      console.log(error);
      setAlertMessage(
        `Error Fetching Data. Please check your Internet Connection.`
      );
      setInvalidAlert(true);
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
              {alertMessage}
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
            autoComplete="off"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
              setInvalidAlert(false);
            }}
          />
          <LoginInput
            id="standard-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
              setInvalidAlert(false);
            }}
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
