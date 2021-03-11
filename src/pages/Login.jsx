import React from 'react';
import LoginCss from '../StudentComponents/LoginComponent/Login.module.css';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from '../images/logo.svg';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const LoginButton = withStyles(() => ({
    root: {
      width: "60%",
      color: "#fff",
      backgroundColor: "#27AE60",
      letterSpacing: "1.25px",
      '&:hover': {
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
      '&:hover': {
        backgroundColor: "#222831",
      },
    },
  }))(Button);

const LoginInput = withStyles(() => ({
    root: {
        width: "60%",
        color: "#070D59 !important",
        fontSize: "10px",
    }
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
    const classes = useStyles();
    const [loginType, setLoginType] = React.useState('');
    const handleChange = (event) => {
        setLoginType(event.target.value);
      };

    return (
        <div className={LoginCss.Login}>
            <div className={LoginCss.LoginForm}>
            <div className={LoginCss.LogoDiv}>
            <img
                src={logo}
                alt="logo"
                />
            </div>
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
                <LoginInput required id="standard-required" label="Username" />
                <LoginInput 
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password" 
                />
                <LoginButton variant="contained" color="primary">
                    LOGIN
                </LoginButton>
                <ResetPassButton variant="contained" color="secondary">
                    Reset Password
                </ResetPassButton>
            </div>
        </div>
    )
}

export default Login