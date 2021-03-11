import React from 'react';
import LoginCss from '../StudentComponents/LoginComponent/Login.module.css';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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


function Login() {
    return (
        <div className={LoginCss.Login}>
            <div className={LoginCss.LoginForm}>
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