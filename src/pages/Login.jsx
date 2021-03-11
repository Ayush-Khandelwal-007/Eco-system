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
      fontFamily: "Roboto",
      '&:hover': {
        backgroundColor: "#222831",
      },
    },
  }))(Button);



function Login() {
    return (
        <div className={LoginCss.Login}>
            <div className={LoginCss.LoginForm}>
                <TextField required id="standard-required" label="Username" />
                <TextField required id="standard-required" label="Password" />
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