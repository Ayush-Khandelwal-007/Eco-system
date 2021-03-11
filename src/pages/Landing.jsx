import React from 'react'
import LandingCss from '../StudentComponents/LandingComponent/Landing.module.css';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const LoginBtn = withStyles(() => ({
    root: {
      width: "20vw",
      minWidth: "200px",
      height: "45px",
      color: "#fff",
      borderRadius: "10px",
      backgroundColor: "rgba(7, 13, 89, 0.9)",
      letterSpacing: "1.25px",
      '&:hover': {
        backgroundColor: "#070D59",
      },
    },
  }))(Button);

export default function Landing() {
    return (
        <div className={LandingCss.main}>
            <div className={LandingCss.HelloTxt}>Hello Amigos!</div>
            <LoginBtn variant="contained" color="primary">
                Login
            </LoginBtn>
        </div>
    )
}
