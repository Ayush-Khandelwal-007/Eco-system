import React from 'react';
import LoginCss from '../StudentComponents/LoginComponent/Login.module.css';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function Login() {
    return (
        <div className={LoginCss.Login}>
            <div className={LoginCss.LoginForm}>
            <form  noValidate autoComplete="off">
                <TextField required id="standard-required" label="Username" />
                <TextField required id="standard-required" label="Password" />
            </form>
                <Button variant="contained" color="primary">
                    LOGIN
                </Button>
                <Button variant="contained" color="secondary">
                    Reset Password
                </Button>
            </div>
        </div>
    )
}

export default Login